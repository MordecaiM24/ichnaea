import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/User.js";
import "dotenv/config";
import { CollegeModel } from "../models/College.js";

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

const saveCollege = async (req, res, next) => {
  const collegeToSave = req.body.collegeToSave;
  const userID = req.body.userID;

  const response = await UserModel.updateOne(
    { _id: userID },
    { $addToSet: { savedColleges: collegeToSave } }
  );

  //Will only add supplemental essays to userTodo if the college isn't added yet
  if (response.modifiedCount) {
    //Get the college that im adding's supplemental essays
    const college = await CollegeModel.findOne({
      _id: collegeToSave,
    });

    const user = await UserModel.findOne({ _id: userID });
    console.log(user.todo);

    const collegeName = college.fullName;

    const suppEssays = college.suppEssays.map((essay) => {
      return { [essay]: false };
    });

    user.todo.suppEssays.push({ [collegeName]: suppEssays });
    console.log(user.todo);

    //Upload to user todo with all supplemental essay status false.
    // const newRes = await UserModel.updateOne(
    //   { _id: userID },
    //   {
    //     $push: {
    //       "todo.suppEssays": "fuck",

    //       // "todo.suppEssays": {
    //       //   [collegeName]: college.suppEssays,
    //       // },
    //     },
    //   }
    // );

    const newRes = await user.save();

    res.status(200).json(newRes);
    return;
  }

  res.status(404).send("Did not update todo list");
};

const removeCollege = async (req, res, next) => {
  const collegeToRemove = req.params.collegeID;
  const userID = req.params.userID;

  const response = await UserModel.updateOne(
    { _id: userID },
    { $pull: { savedColleges: collegeToRemove } }
  );

  console.log(response);

  res.status(200).json(response);
};

const getSavedColleges = async (req, res, next) => {
  const userID = req.params.userID;
  const savedColleges = await UserModel.findOne({ _id: userID })
    .select("savedColleges")
    .populate("savedColleges", ["suppEssays", "fullName"]);

  res.json(savedColleges.savedColleges); //Original json returns full user with all fields except savedColleges omitted. Using ".savedColleges" returns only the array of colleges
};

export {
  createUser,
  login,
  verifyToken,
  saveCollege,
  getSavedColleges,
  removeCollege,
};
