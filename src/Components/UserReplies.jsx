import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import {
  addLikeReplies,
  deleteReplies,
  limitMinusReplies,
  limitPlusReplies,
  onlyMinusReplies,
  onlyPlusReplies,
  removeLikeReplies,
} from "../store/reducers/reducer";
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import { toast } from "react-toastify";

const UserReplies = ({
  createdAt,
  content,
  user,
  id,
  replyingTo,
  score,
  replies,
  limitMinus,
  limitPlus,
}) => {
  const { comments } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [parentId, setParentId] = useState();
  useEffect(() => {
    comments.map((elem) => {
      return elem.replies.filter((item) => {
        if (item.id !== id) {
          setParentId(elem.id);
          // return elem;
        }
      });
    });
  }, []);
  const removeReplies = (id) => {
    const newReplies = comments.map((item) => {
      const newReply = item.replies.filter((elem) => elem.id !== id);
      return newReply;
    });
    const newComments = comments.map((item, index) => {
      return {
        ...item,
        replies: newReplies[index],
      };
    });
    const parentComment = newComments.filter((elem) => elem.id === parentId);
    console.log(parentComment[0]);
    request(
      `http://localhost:3001/comments/${parentId}`,
      "PUT",
      JSON.stringify(parentComment[0])
    )
      .then(() => console.log("removed"))
      .then(() => dispatch(deleteReplies(id)));
  };
  return (
    <div className="user_reply">
      <div id="user__content" key={id}>
        <div className="score">
          <button
            className="plus"
            onClick={() => {
              if (limitMinus) {
                dispatch(onlyMinusReplies(id));
              } else {
                dispatch(limitPlusReplies(id));
              }
              if (!limitPlus) {
                toast.success("Liked successfully!");

                const findComment = replies.filter((elem) => elem.id === id)[0];
                const newComment = {
                  ...findComment,
                  score: findComment.score + 1,
                };
                console.log(newComment);
                request(
                  `http://localhost:3001/comments/${id}`,
                  "PUT",
                  JSON.stringify(newComment)
                )
                  .then((res) => console.log("Added Successfully!"))
                  .then((data) => dispatch(addLikeReplies(id)));
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
                dispatch(onlyPlusReplies(id));
              } else {
                dispatch(limitMinusReplies(id));
              }

              if (!limitMinus) {
                toast.error("Disliked successfully!");
                const findComment = replies.filter((elem) => elem.id === id)[0];
                const newComment = {
                  ...findComment,
                  score: findComment.score - 1,
                };
                console.log(newComment);
                request(
                  `http://localhost:3001/comments/${id}`,
                  "PUT",
                  JSON.stringify(newComment)
                )
                  .then((res) => console.log("Added Successfully!"))
                  .then((data) => dispatch(removeLikeReplies(id)));
              }
            }}
          >
            <img src={minus} alt="minus" />
          </button>
        </div>
        <div id="user_info">
          {user.username === "siredev" ? (
            <>
              <span className="you">you</span>
              <div className="icons">
                <span id="delete" onClick={() => removeReplies(id)}>
                  Delete
                </span>
                <span id="reply">Edit</span>
              </div>
            </>
          ) : (
            <span className="reply">Reply</span>
          )}

          <div className="user">
            <div className="userImg">
              <img id="userImg" src={user.image.png} alt={user.username} />
            </div>
            <h4 className="username">{user.username}</h4>
            <span className="createdAt">{createdAt}</span>
          </div>
          <div className="content">
            <p>
              <span className="replying">{`@${replyingTo} `}</span>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReplies;
