import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, required: true, unique: true },
  email: String,
  savedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "colleges" }],
  todo: Array,
  // todo: [
  //   { task: String, completed: Boolean },
  //   { task: String, suppEssays: [{ collegeName: String, questions: Array }] },
  // ],
});

export const UserModel = mongoose.model("users", UserSchema);
