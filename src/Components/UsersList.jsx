import React from "react";
import UserItem from "./UserItem";

const UsersList = ({ comments }) => {
  return (
    <div className="post">
      {comments.map((elem) => (
        <UserItem key={elem.id} {...elem} />
      ))}
    </div>
  );
};

export default UsersList;
