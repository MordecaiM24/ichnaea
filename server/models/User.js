import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "colleges" }],
  todo: [
    { commonAppEssay: Boolean, _id: false },
    { actUploaded: Boolean },
    { satUploaded: Boolean },
    { extracurriculars: Boolean },
    { teacherRecs: Boolean },
    { writingSupplement: Boolean },
    { suppEssays: Array },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
