import { createAction } from "@reduxjs/toolkit";

const chatFetching = createAction("chatFetching");
const chatFetched = createAction("chatFetched", (comments) => {
  return {
    payload: comments,
  };
});
const chatFetchingError = createAction("chatFetchingError");
const addLike = createAction("addLike", (id) => {
  return {
    payload: id,
  };
});
const removeLike = createAction("removeLike", (id) => {
  return {
    payload: id,
  };
});
const limitPlusFunc = createAction("limitPlus", (id) => {
  return {
    payload: id,
  };
});

const limitMinusFunc = createAction("limitMinus", (id) => {
  return {
    payload: id,
  };
});
const addComment = createAction("addComment", (msg) => {
  return {
    payload: msg,
  };
});

const onlyPlus = createAction("onlyPlus", (id) => {
  return {
    payload: id,
  };
});

const onlyMinus = createAction("onlyMinus", (id) => {
  return {
    payload: id,
  };
});
const userDelete = createAction("userDelete", (id) => {
  return {
    payload: id,
  };
});
const addLikeReplies = createAction("addLikeReplies", (id) => {
  return {
    payload: id,
  };
});
const removeLikeReplies = createAction("removeLikeReplies", (id) => {
  return {
    payload: id,
  };
});
const onlyPlusReplies = createAction("onlyPlusReplies", (id) => {
  return {
    payload: id,
  };
});
const onlyMinusReplies = createAction("onlyMinusReplies", (id) => {
  return {
    payload: id,
  };
});
const limitPlusReplies = createAction("limitPlusReplies", (id) => {
  return {
    payload: id,
  };
});
const limitMinusReplies = createAction("limitMinusReplies", (id) => {
  return {
    payload: id,
  };
});
const deleteReplies = createAction("deleteReplies", (id) => {
  return {
    payload: id,
  };
});

const chatFetch = (request) => (dispatch) => {
  dispatch("chatFetching");
  request("http://localhost:3001/comments").then((data) =>
    dispatch(chatFetched(data))
  );
};
const removeComment = createAction("removeComment", (id) => {
  return {
    payload: id,
  };
});
const replyUser = createAction("replyUser", (id, newReplyUser) => {
  return {
    payload: {
      id: id,
      newReplyUser: newReplyUser,
    },
  };
});
// const replyUser = (id, newReplyUser) => {
//   return {
//     type: "replyUser",
//     payload: id,
//     newReplyUser,
//   };
// };

export {
  addLike,
  removeLike,
  chatFetched,
  chatFetching,
  chatFetchingError,
  limitPlusFunc,
  limitMinusFunc,
  addComment,
  onlyMinus,
  onlyPlus,
  removeComment,
  addLikeReplies,
  removeLikeReplies,
  onlyPlusReplies,
  onlyMinusReplies,
  limitPlusReplies,
  limitMinusReplies,
  deleteReplies,
  replyUser,
  userDelete,
  chatFetch,
};
