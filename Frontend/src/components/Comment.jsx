// imports
import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaPalette } from "react-icons/fa";

const Comment = (props) => {
  // hooks
  const [db_comment, setComment] = useState("");
  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [focused, setFocused] = useState(false);
  const [opacity, setOpacity] = useState(0.25);
  const [subComments, setSubComments] = useState([]);

  // props vars
  const { comment, threadId } = props;

  // check if values from db match current values of comment
  const checkDefaults = () => {
    if (color === "#fff") {
      setColor(props.comment.Color);
    }
    if (commentText === "") setCommentText(props.comment.CommentText);
  };

  // func that colors the comment div
  const colorMe = () => {
    if (color === "#fff") {
      return comment.Color;
    }
    return color;
  };

  // func that fills the input field of comment
  function textMe() {
    if (commentText === "") return comment.CommentText;
    return commentText;
  }

  // checks whether enter key was pressed or blur
  const handleKeyDownComment = (event) => {
    if (event.key === "Enter" || !focused) {
      createNewComment();
      return true;
    }
    return false;
  };

  // create new comment in db / edit an existing one
  const createNewComment = async () => {
    checkDefaults();
    if (commentText === "") {
      console.log("Enter comment text!");
      return;
    }
    console.log("comment id", db_comment);
    if (db_comment !== "") handleEditComment();
    else {
      console.log("creating a new comment!");
      let x = encodeURIComponent(color);
      const url = `http://localhost:5000/createComment?Color=${x}&CommentText=${commentText}&ThreadId=${threadId}`;
      const response = await fetch(url, { method: "POST" });
      if (response.status !== 200) console.log("Couldnt create the comment!");
      const resopnseJson = await response.json();
      console.log(
        "this is the response for creating a new comment: ",
        resopnseJson
      );
      setComment(resopnseJson);
      setOpacity(1);
    }
  };

  // edit an exsiting comment
  const handleEditComment = async () => {
    console.log("editing exisiting comment!");
    let x = encodeURIComponent(color);

    const url = `http://localhost:5000/editComment?commentId=${db_comment}&Color=${x}&CommentText=${commentText}&ThreadId=${threadId}`;
    const response = await fetch(url, { method: "PUT" });
    if (response.status !== 200) console.log("Couldnt create the comment!");
    setComment(db_comment);
  };

  // funcs to control the focus / blur state.
  const onFocus = () => {
    setFocused(true);
    if (props.comment._id != undefined) setComment(props.comment._id);
    if (comment === "")
      if (comment.CommentText !== "") comment = comment.CommentText;
  };
  const onBlur = () => {
    setFocused(false);
    createNewComment();
  };

  // checks if a new comment can be added, if so adds a defualt state of a new sub comment to subcomments list.
  const handleNewComment = () => {
    console.log("new comment has been clicked!");
    if (opacity !== 1) {
      console.log("Cannot add a comment yet!");
      return;
    }
    setSubComments([...subComments, { color: "#fff", text: "", id: 0 }]);
  };

  return (
    <div
      style={{
        backgroundColor: `${colorMe()}`,
      }}
      onKeyDown={handleKeyDownComment}
    >
      <h3>
        Comment:
        <FaPalette
          onClick={() => {
            setShowColorPicker((showColorPicker) => !showColorPicker);
          }}
          size={30}
        ></FaPalette>
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
          placeholder="New comment"
          onChange={(event) => setCommentText(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          value={textMe()}
        ></input>
        <BsChatSquareDotsFill
          style={{ opacity: `${opacity}` }}
          onClick={() => {
            handleNewComment();
          }}
          size={30}
        ></BsChatSquareDotsFill>
      </h3>
    </div>
  );
};

export default Comment;
