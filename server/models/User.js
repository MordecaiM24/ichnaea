import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "colleges" }],
  todo: Array,
  // todo: [
  //   { task: String, completed: Boolean },
  //   { task: String, suppEssays: [{ collegeName: String, questions: Array }] },
  // ],
});

export const UserModel = mongoose.model("users", UserSchema);
