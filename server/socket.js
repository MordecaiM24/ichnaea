import { Server } from "socket.io";
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

import mongoose from "mongoose";
import { DocumentModel } from "./models/Document.js";

mongoose.connect("mongodb://localhost:27017/google-docs-clone");
const defaultValue = "Hello World!";

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("get-document", async (documentID) => {
    const document = await findOrCreateDocument(documentID);

    socket.join(documentID);

    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentID).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await DocumentModel.findByIdAndUpdate(documentID, { data });
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await DocumentModel.findById(id);

  // if (document) console.log(document.data.ops[0].insert);
  // console.log("empty doc");

  if (document) return document;
  return await DocumentModel.create({ _id: id, data: defaultValue });
}
