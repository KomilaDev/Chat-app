import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addComment } from "../store/reducers/reducer";
import useHttp from "../hooks/useHttp";
import moment from "moment/moment";
import { toast } from "react-toastify";

const AddComment = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { request } = useHttp();

  const AddComments = (e) => {
    toast.success("Added successfully!");
    e.preventDefault();
    setComment(e.target.value);
    const newComment = {
      id: v4(),
      content: comment,
      createdAt: moment().format("DD. MM YYYY"),
      score: 0,
      user: {
        image: {
          png: "https://interactive-comments-section-azure.vercel.app/images/avatars/image-juliusomo.png",
        },
        username: "siredev",
      },
      replies: [],
      limitPlus: false,
      limitMinus: false,
    };
    request(
      "http://localhost:3001/comments",
      "POST",
      JSON.stringify(newComment)
    )
      .then(() => console.log("Added SuccessFully!"))
      .then(() => dispatch(addComment(comment)));
    setComment("");
  };
  return (
    <form className="AddForm" onSubmit={AddComments}>
      <img
        className="addImg"
        src="https://interactive-comments-section-azure.vercel.app/images/avatars/image-juliusomo.png"
        alt=""
      />
      <textarea
        className="msg"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add a comment.."
      ></textarea>
      <button className="sendBtn">SEND</button>
    </form>
  );
};

export default AddComment;
