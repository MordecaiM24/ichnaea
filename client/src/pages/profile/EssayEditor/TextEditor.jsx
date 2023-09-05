import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const SAVE_INTERVAL_MS = 1000;

export default function TextEditor() {
  const navigate = useNavigate();

  const { id: documentID } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  const location = useLocation();
  const prompt = location.state.prompt;

  // Initializes socket connection
  useEffect(() => {
    // const s = io("http://localhost:3001");
    const s = io(import.meta.env.VITE_SOCKET);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Uploads data on text-change
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // Initializes document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      console.log(Boolean(document.ops[0].insert));

      // Checks if doc is new
      if (!document.ops[0].insert) {
        quill.setText(" " + prompt + "\n\n\n\n");
        quill.format("align", "center");
        quill.format("header", 2);
      } else {
        quill.setContents(document);
      }

      quill.enable();
    });

    socket.emit("get-document", documentID);
  }, [socket, quill, documentID]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
      <button
        style={{ zIndex: 3, position: "fixed", top: "20px", right: "24px" }}
        onClick={() => {
          socket.emit("save-document", quill.getContents());
          navigate("/profile");
        }}
      >
        SAVE
      </button>
    </>
  );
}
