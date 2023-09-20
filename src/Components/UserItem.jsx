import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import {
  addLike,
  limitMinusFunc,
  limitPlusFunc,
  onlyMinus,
  onlyPlus,
  removeLike,
  removeComment,
  replyUser,
} from "../store/reducers/reducer";
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import UserReplies from "./UserReplies";
import { v4 } from "uuid";
import moment from "moment";
import { toast } from "react-toastify";

const UserItem = ({
  score,
  user,
  createdAt,
  content,
  id,
  replies,
  limitPlus,
  limitMinus,
}) => {
  const { comments } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [replyValue, setReplyValue] = useState("");
  const [replyDisplay, setReplyDisplay] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    request("http://localhost:3001/currentUser/").then((data) =>
      setUserData(data)
    );
  }, []);
  const removeCommentFunc = (id) => {
    request(`http://localhost:3001/comments/${id}`, "DELETE")
      .then(() => console.log("removed successfully!"))
      .then(() => dispatch(removeComment(id)));
    toast.error("Removed successfully!");
  };
  const showReply = () => {
    setReplyDisplay(!replyDisplay);
  };
  const replyUserFunc = (e) => {
    e.preventDefault();
    const newReplyUser = {
      id: v4(),
      content: replyValue,
      createdAt: moment().format("DD. MM YYYY"),
      score: 0,
      replyingTo: user.username,
      user: {
        image: {
          png: userData.image.png,
        },
        username: userData.username,
      },
      limitPlus: false,
      limitMinus: false,
    };
    const findParent = comments.filter((el) => el.id === id);
    const newParent = {
      ...findParent[0],
      replies: [...findParent[0].replies, newReplyUser],
    };
    if (replyValue !== "") {
      setReplyDisplay(false);
      request(
        `http://localhost:3001/comments/${id}`,
        "PUT",
        JSON.stringify(newParent)
      )
        .then(() => console.log("replied successfully!"))
        .then(() => dispatch(replyUser(id, newReplyUser)));
    }
    setReplyValue("");
    toast.success("Replied successfully!");
  };
  return (
    <>
      <div className="user__content">
        <div className="score">
          <button
            className="plus"
            onClick={() => {
              if (limitMinus) {
                dispatch(onlyMinus(id));
                toast.success("Liked successfully!");
              } else {
                dispatch(limitPlusFunc(id));
              }
              if (!limitPlus) {
                const findComment = comments.filter(
                  (elem) => elem.id === id
                )[0];
                const newComment = {
                  ...findComment,
                  score: findComment.score + 1,
                  limitPlus: true,
                  limitMinus: false,
                };
                request(
                  `http://localhost:3001/comments/${id}`,
                  "PUT",
                  JSON.stringify(newComment)
                )
                  .then((res) => console.log("Added Successfully!"))
                  .then((data) => dispatch(addLike(id)));
              }
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          <span className="rate">{score}</span>
          <button
            className="minus"
            onClick={() => {
              if (limitPlus) {
                dispatch(onlyPlus(id));
                toast.error("Disliked successfully!");
              } else {
                dispatch(limitMinusFunc(id));
              }
              if (!limitMinus && score > 0) {
                const findComment = comments.filter(
                  (elem) => elem.id === id
                )[0];
                const newComment = {
                  ...findComment,
                  score: findComment.score - 1,
                  limitPlus: false,
                  limitMinus: true,
                };
                request(
                  `http://localhost:3001/comments/${id}`,
                  "PUT",
                  JSON.stringify(newComment)
                )
                  .then((res) => console.log("Added Successfully!"))
                  .then((data) => dispatch(removeLike(id)));
              }
            }}
          >
            <img src={minus} alt="minus" />
          </button>
        </div>
        <div className="user_info">
          {user.username === "siredev" ? (
            <>
              <span id="you">you</span>
              <div className="icons">
                <span id="delete" onClick={() => removeCommentFunc(id)}>
                  Delete
                </span>
                <span id="reply">Edit</span>
              </div>
            </>
          ) : (
            <span className="reply" onClick={showReply}>
              Reply
            </span>
          )}
          <div className="user">
            <div className="userImg">
              <img id="userImg" src={user.image.png} alt={user.username} />
            </div>
            <h4 className="username">{user.username}</h4>
            <span id="atCreated">{createdAt}</span>
          </div>
          <div className="content">
            <p>{content}</p>
          </div>
        </div>
      </div>

      {replyDisplay ? (
        <form className="AddForm">
          <img
            className="addImg"
            src="https://interactive-comments-section-azure.vercel.app/images/avatars/image-juliusomo.png"
            alt="userImg"
          />
          <textarea
            className="msg"
            onChange={(e) => setReplyValue(e.target.value)}
            value={replyValue}
            placeholder="Reply"
          ></textarea>
          <button className="sendBtn" onClick={replyUserFunc}>
            REPLY
          </button>
        </form>
      ) : null}

      {/* -----------Replies----------- */}

      {replies.map((item) => (
        <UserReplies key={item.id} {...item} replies={replies} />
      ))}
    </>
  );
};

export default UserItem;
