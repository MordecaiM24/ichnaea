import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/User.js";
import "dotenv/config";

const createUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await UserModel.findOne({ username }); // key value are the same, just passing key

  if (user) {
    return res.status(409).json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  user = await UserModel.findOne({ username });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ msg: "User registered successfully", token, userID: user._id });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(403).json({ msg: "User doesn't exist" });
  }
  console.log(user._id);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ msg: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { createUser, login, verifyToken };
