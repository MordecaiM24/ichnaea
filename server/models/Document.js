import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  _id: String,
  data: Object,
});

export const DocumentModel = mongoose.model("documents", DocumentSchema);
