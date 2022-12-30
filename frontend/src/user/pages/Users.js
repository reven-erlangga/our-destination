import React from "react";

import UserList from "../components/UserList/UserList";

const Users = () => {
  const users = [
    {
      id: "u1",
      name: "Nahida",
      image:
        "https://images.pexels.com/photos/14324926/pexels-photo-14324926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      places: 3,
    },
  ];

  return <UserList items={users} />;
};

export default Users;
