// imports
import React, { useState, useEffect } from "react";
import NavbarThread from "./components/NavbarThread";
import { ChromePicker } from "react-color";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaPalette } from "react-icons/fa";
import Comment from "./components/Comment";

const ThreadView = (props) => {
  // hooks
  const [db_thread, setThread] = useState("");
  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [threadName, setThreadName] = useState("");
  const [focused, setFocused] = useState(false);
  const [opacity, setOpacity] = useState(0.25);
  const [comments, setComments] = useState([]);

  // communicates with the server and retrieves the thread in the db according to thread id
  const handleGetThreadById = async () => {
    if (db_thread == null || db_thread === "") return;
    console.log("edit thread has been clicked! - thread number: ", db_thread);
    const url = `http://localhost:5000/getThreadById?ID=${db_thread}`;
    const response = await fetch(url);
    const resopnseJson = await response.json();
    setColor(resopnseJson.Color);
    setThreadName(resopnseJson.ThreadName);
    setOpacity(1);
  };

  // checks whether enter key was pressed or blur
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || !focused) {
      createNewThread();
      return true;
    }
    return false;
  };

  // funcs to control the focus / blur state.
  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    createNewThread();
  };

  // communicates with the server and creates a new thread in the db / edits exsiting thread
  const createNewThread = async () => {
    if (threadName === "") {
      console.log("Enter thread title!");
      return;
    }
    if (db_thread !== "") handleEditThread();
    else {
      console.log("creating a new thread!");
      let x = encodeURIComponent(color);
      const url = `http://localhost:5000/createThread?Color=${x}&ThreadName=${threadName}`;
      const response = await fetch(url, { method: "POST" });
      if (response.status !== 200) console.log("Couldnt create the thread!");
      const resopnseJson = await response.json();
      console.log(
        "this is the response for creating a new thread: ",
        resopnseJson
      );
      setThread(resopnseJson);
      setOpacity(1);
    }
  };

  // checks if a new comment can be added, if so adds a defualt state of a new comment to comment list.
  const handleNewComment = () => {
    console.log("new comment has been clicked!");
    if (opacity !== 1) {
      console.log("Cannot add a comment yet!");
      return;
    }
    setComments([...comments, { color: "#fff", text: "", id: 0 }]);
  };

  // communicates with the server and retrieves all comments for the specific thread in the db according to thread id
  const loadCommentsFromDB = async () => {
    console.log("fetching comments");
    const url = `http://localhost:5000/getComments?threadId=${db_thread}`;
    const response = await fetch(url);
    const resopnseJson = await response.json();
    console.log(resopnseJson);
    setComments(resopnseJson);
  };

  // on change of comments array display comments in console.
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  // communicates with the server and edits an existing thread in the db
  const handleEditThread = async () => {
    console.log("editing exisiting thread!");
    let x = encodeURIComponent(color);
    const url = `http://localhost:5000/editThread?threadId=${db_thread}&Color=${x}&ThreadName=${threadName}`;
    const response = await fetch(url, { method: "PUT" });
    if (response.status !== 200) console.log("Couldnt create the thread!");
    setThread(db_thread);
  };

  // TODO - add a minimize btn and implement functionality
  const handleMinimizeBtn = () => {
    console.log("minimize btn has been clicked");
  };

  // set current thread id according to web path
  const getRoute = async () => {
    var address = window.location.href;
    const id = address.split("/")[4];
    if (id == null) {
      return false;
    }
    setThread(id);
    return true;
  };

  // on change of thread id perform the following - load data about the thread.
  useEffect(() => {
    if (getRoute()) handleGetThreadById();
    loadCommentsFromDB();
  }, [db_thread]);

  return (
    <div style={{ textAlign: "center" }}>
      <NavbarThread> </NavbarThread>
      <div style={{ backgroundColor: `${color}` }} onKeyDown={handleKeyDown}>
        <FaPalette
          onClick={() => {
            setShowColorPicker((showColorPicker) => !showColorPicker);
          }}
          size={30}
        />
        {showColorPicker && (
          <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        )}
        <input
          autoFocus
          width="42"
          height="30"
          type="text"
          placeholder="Thread name"
          onChange={(event) => setThreadName(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          value={threadName}
        ></input>
        <BsChatSquareDotsFill
          style={{ opacity: `${opacity}` }}
          onClick={() => {
            handleNewComment();
          }}
          size={30}
        />
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            threadId={db_thread}
          ></Comment>
        ))}
      </div>
    </div>
  );
};

export default ThreadView;
