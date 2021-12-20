import React from "react";
import { useEffect } from "react";
import { List } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import UserInfo from "../../components/UserInfo";
import { getUsers } from "../../reducers/users/usersSlice";

const Home = () => {
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <List>
      {users &&
        users.map((user) => {
          const { id } = user;
          return <UserInfo key={`user-${id}`} id={id} />;
        })}
    </List>
  );
};

export default Home;
