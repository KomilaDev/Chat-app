import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import ChatSlice from "./reducers/reducer";

// const stringMiddleware = () => (next) => (action) => {
//   if (typeof action === "string") {
//     return next({ type: action });
//   }
//   return next(action);
// };
const store = configureStore({
  reducer: ChatSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
