import React from "react";

import "./UserList.css";

import Card from "../../../shared/components/UIElements/Card";
import UserItem from "../UserItem/UserItem";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>User not found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
