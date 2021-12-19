import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type UserForm = {
  name: string;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  phone: string;
  website: string;
};

const renderCollapseIcon = (isCollapsed: boolean) =>
  isCollapsed ? (
    <ArrowForwardIosIcon style={{ transform: "rotate(90deg)" }} />
  ) : (
    <ArrowForwardIosIcon />
  );

const request = async (url: string, method = "GET", data = {}) => {
  const response = await fetch(url, {
    method,
  });

  return await response.json();
};

type UserProps = {
  id: number;
  userName: string;
  displayPosts: (id: number) => void;
  register: any;
  handleCollapse: (type: "users" | "posts", id: number) => void;
  posts: null | Array<{ title: string; body: string }>;
  collapsePosts: boolean;
  collapseUserInfo: boolean;
};

const userInfo = (props: UserProps) => {
  const {
    id,
    userName,
    displayPosts,
    register,
    posts,
    collapsePosts,
    collapseUserInfo,
    handleCollapse,
  } = props;

  return (
    <>
      <ListItem button onClick={() => handleCollapse("users", id)}>
        {renderCollapseIcon(collapseUserInfo)}
        {userName}
      </ListItem>
      <Collapse in={collapseUserInfo} timeout="auto" unmountOnExit>
        <Paper
          key={id}
          style={{
            margin: 10,
          }}
        >
          <form>
            <TextField {...register(`${id}.name`)} />
            <TextField {...register(`${id}.username`)} />
            <TextField {...register(`${id}.email`)} />
            <TextField {...register(`${id}.street`)} />
            <TextField {...register(`${id}.suite`)} />
            <TextField {...register(`${id}.city`)} />
            <TextField {...register(`${id}.phone`)} />
            <TextField {...register(`${id}.website`)} />
          </form>

          <Button onClick={() => displayPosts(id)}>Get user's posts</Button>
          {posts && (
            <>
              <ListItem button onClick={() => handleCollapse("posts", id)}>
                {renderCollapseIcon(collapsePosts)}
                <ListItemText
                  primary={collapsePosts ? "Hide posts" : "Show posts"}
                />
              </ListItem>

              <Collapse in={collapsePosts} timeout="auto" unmountOnExit>
                <List>
                  {posts.map((post) => (
                    <ListItem>
                      <ListItemText
                        key={`${id}-${post.title}`}
                        primary={post.title}
                        secondary={post.body}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </>
          )}
        </Paper>
      </Collapse>
    </>
  );
};

type CollapsedState = {
  users: null | Array<number>;
  posts: null | Array<number>;
};

const initialCollapsedState: CollapsedState = {
  users: null,
  posts: null,
};

const Home = () => {
  const [users, setUsers] = useState<null | Array<User>>(null);
  const [posts, setPosts] = useState<null | Array<Post>>(null);
  const [collapsedState, setCollapsedState] = useState<CollapsedState>(
    initialCollapsedState
  );
  const { register, setValue } = useForm<Array<UserForm>>();

  useEffect(() => {
    if (!users) {
      const usersUrl = "https://jsonplaceholder.typicode.com/users";

      request(usersUrl).then((users: Array<User>) => {
        setUsers(users);
        users.forEach((entity: User) => {
          const { name, username, email, address, phone, website } = entity;
          const { street, suite, city } = address;

          setValue(`${entity.id}.name`, name);
          setValue(`${entity.id}.username`, username);
          setValue(`${entity.id}.email`, email);
          setValue(`${entity.id}.street`, street);
          setValue(`${entity.id}.suite`, suite);
          setValue(`${entity.id}.city`, city);
          setValue(`${entity.id}.phone`, phone);
          setValue(`${entity.id}.website`, website);
        });
      });
    }
  }, [setValue, users]);

  const fetchUserPosts = useCallback(
    (id: number) => {
      const isUserPostsInStore =
        posts && posts.some((post) => post.userId === id);

      if (!isUserPostsInStore) {
        const postsQuery = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

        request(postsQuery).then((posts) =>
          setPosts((prevPosts) =>
            prevPosts ? [...prevPosts, ...posts] : posts
          )
        );
      }
    },
    [posts]
  );

  const handleCollapse = useCallback(
    (type: "users" | "posts", id: number) => {
      if (collapsedState[type] && collapsedState[type].includes(id)) {
        setCollapsedState((prevState) => ({
          ...prevState,
          [type]:
            prevState[type] &&
            prevState[type].filter((userId: number) => userId !== id),
        }));
      } else {
        setCollapsedState((prevState) => ({
          ...prevState,
          [type]: prevState[type] ? [...prevState[type], id] : [id],
        }));
      }
    },
    [collapsedState]
  );

  return (
    <List>
      {users &&
        users.map((user) => {
          const { id, name } = user;

          return userInfo({
            id,
            userName: name,
            displayPosts: fetchUserPosts,
            register,
            handleCollapse,
            posts:
              posts &&
              posts.filter((postEntities) => postEntities.userId === id),
            collapsePosts: Boolean(
              collapsedState.posts && collapsedState.posts.includes(id)
            ),
            collapseUserInfo: Boolean(
              collapsedState.users && collapsedState.users.includes(id)
            ),
          });
        })}
    </List>
  );
};

export default Home;
