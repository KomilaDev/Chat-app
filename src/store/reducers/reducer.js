import { createSlice } from "@reduxjs/toolkit";

import moment from "moment/moment";
import { v4 } from "uuid";

const initialState = {
  comments: [],
  isLoading: "none",
};

const ChatSlice = createSlice({
  name: "chatslice",
  initialState,
  reducers: {
    chatFetching: (state) => {
      state.isLoading = "loading";
    },
    chatFetched: (state, action) => {
      state.isLoading = "loaded";
      state.comments = action.payload;
    },
    chatFetchingError: (state) => {
      state.isLoading = "loadingError";
    },
    addLike: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            score: elem.score + 1,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
    removeLike: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            score: elem.score - 1,
          };
        } else {
          return elem;
        }
      });

      state.comments = newComments;
    },
    limitPlusFunc: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: true,
            limitMinus: false,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
    limitMinusFunc: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: false,
            limitMinus: true,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
    addComment: (state, action) => {
      const newComment = {
        id: v4(),
        content: action.payload,
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
        limitMinus: true,
      };

      state.comments = [...state.comments, newComment];
    },
    onlyPlus: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: false,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
    onlyMinus: (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitMinus: false,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
    removeLikeReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              score: elem.score > 0 ? elem.score - 1 : elem.score,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    addLikeReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              score: elem.score + 1,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    onlyPlusReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    onlyMinusReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitMinus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    limitPlusReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: true,
              limitMinus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    limitMinusReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: false,
              limitMinus: true,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    deleteReplies: (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.filter(
          (elem) => elem.id !== action.payload
        );
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    },
    removeComment: (state, action) => {
      const newComments = state.comments.filter(
        (item) => item.id !== action.payload
      );
      state.comments = newComments;
    },
    replyUser(state, action) {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload.id) {
          return {
            ...elem,
            replies: [...elem.replies, action.payload.newReplyUser],
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    },
  },
});

export const {
  addComment,
  addLike,
  addLikeReplies,
  chatFetched,
  chatFetching,
  chatFetchingError,
  deleteReplies,
  limitMinusFunc,
  limitMinusReplies,
  limitPlusFunc,
  limitPlusReplies,
  onlyMinus,
  onlyMinusReplies,
  onlyPlus,
  onlyPlusReplies,
  removeComment,
  removeLike,
  removeLikeReplies,
  replyUser,
} = ChatSlice.actions;

export default ChatSlice;
