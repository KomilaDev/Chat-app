import React, { useEffect } from "react";
import "./App.css";
import UsersList from "./Components/UsersList";
import useHttp from "./hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import { chatFetched, chatFetching } from "./store/reducers/reducer";
import AddComment from "./Components/AddComment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { comments, isLoading } = useSelector((state) => state);
  useEffect(() => {
    dispatch(chatFetching());
    request("http://localhost:3001/comments").then((data) =>
      dispatch(chatFetched(data))
    );
  }, []);
  const renderUsersList = (comments) => {
    if (comments.length === 0) {
      return <h1> Comments are not found! </h1>;
    }
    if (isLoading === "loading") {
      <Loader />;
    } else if (isLoading === "loadingError") {
      <Error />;
    }
    return (
      <>
        <UsersList comments={comments} />
        <AddComment />
      </>
    );
  };

  return (
    <div>
      {" "}
      {renderUsersList(comments)}
      <ToastContainer />
    </div>
  );
};

export default App;
