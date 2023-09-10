import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./routes/users.js";
import { collegeRouter } from "./routes/colleges.js";
import { Server } from "socket.io";
import { DocumentModel } from "./models/Document.js";
import { createServer } from "http";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/colleges", collegeRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res, next) => {
  res.status(200).send("Listening on port 3002!");
});

mongoose.connect(
  // `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@cluster0.rnqhvef.mongodb.net/production?retryWrites=true&w=majority`
  `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@cluster0.rnqhvef.mongodb.net/?retryWrites=true&w=majority`
  // `mongodb://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@ac-2kh7eip-shard-00-00.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-01.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-02.rnqhvef.mongodb.net:27017/?ssl=true&replicaSet=atlas-4i34dx-shard-0&authSource=admin&retryWrites=true&w=majority`
  // `mongodb://localhost:27017`
);

const expressServer = app.listen(5000, async () => {
  console.log("Server listening on port 5000...");
});

//socket connection

// const io = new Server(httpServer, { cors: { origin: "*" } });

// const io = new Server(3001, {
//   cors: {
//     // origin: "http://localhost:5173",
//     // origin: "http://192.168.1.10:5173",
//     // origin: "https://universitrack.com",
//     methods: ["GET", "POST"],
//   },
// });
const io = new Server(expressServer, { cors: { origin: "*" } });

const defaultValue = {
  ops: [
    {
      insert: "",
    },
  ],
};

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

// httpServer.listen(3001);
