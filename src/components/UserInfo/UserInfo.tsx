import React, { useCallback, useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchPostsByUserId } from "../../reducers/posts/postsSlice";
import { shallowEqual } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

const renderCollapseIcon = (isCollapsed: boolean) =>
  isCollapsed ? (
    <ArrowForwardIosIcon style={{ transform: "rotate(90deg)" }} />
  ) : (
    <ArrowForwardIosIcon />
  );

const initialCollapsedState = {
  users: false,
  posts: false,
};

type UserInfoProps = {
  id: number;
};

const UserInfo = (props: UserInfoProps) => {
  const { id } = props;
  const [collapsedState, setCollapsedState] = useState<
    typeof initialCollapsedState
  >(initialCollapsedState);
  const dispatch = useAppDispatch();
  const userPosts = useAppSelector(
    (state) =>
      state.posts.posts &&
      state.posts.posts.filter((entry) => entry.userId === id),
    shallowEqual
  );
  const user = useAppSelector(
    (state) =>
      state.users.users && state.users.users.find((entry) => entry.id === id)
  );

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserForm>({ mode: "onChange" });

  const handleCollapse = useCallback((type: "users" | "posts") => {
    setCollapsedState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  }, []);

  useEffect(() => {
    if (user) {
      const { name, username, email, address, phone, website } = user;
      const { street, suite, city } = address;

      setValue(`name`, name);
      setValue(`username`, username);
      setValue(`email`, email);
      setValue(`street`, street);
      setValue(`suite`, suite);
      setValue(`city`, city);
      setValue(`phone`, phone);
      setValue(`website`, website);
    }

    return () => reset();
  }, [reset, setValue, user]);

  const onSubmit: SubmitHandler<UserForm> = (data, event) => {
    event.preventDefault();
    console.log(data);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <ListItem button onClick={() => handleCollapse("users")}>
        {renderCollapseIcon(collapsedState.users)}
        {user.username}
      </ListItem>
      <Collapse in={collapsedState.users} timeout="auto" unmountOnExit>
        <Paper
          key={id}
          style={{
            margin: 10,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register(`name`, { required: true })}
              label="name"
              error={errors.name && errors.name.type === "required"}
              helperText={
                errors.name &&
                errors.name.type === "required" &&
                "this field is required"
              }
            />

            <TextField
              {...register(`username`, { required: true })}
              label="username"
              error={errors.username && errors.username.type === "required"}
              helperText={
                errors.username &&
                errors.username.type === "required" &&
                "this field is required"
              }
            />

            <TextField
              {...register(`email`, {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              label="email"
              error={errors.email && errors.email.type === "pattern"}
            />

            <TextField
              {...register(`street`, { required: true })}
              label="street"
              error={errors.street && errors.street.type === "required"}
              helperText={
                errors.street &&
                errors.street.type === "required" &&
                "this field is required"
              }
            />
            <TextField
              {...register(`suite`, { required: true })}
              label="suite"
              error={errors.suite && errors.suite.type === "required"}
              helperText={
                errors.suite &&
                errors.suite.type === "required" &&
                "this field is required"
              }
            />
            <TextField
              {...register(`city`, { required: true })}
              label="city"
              error={errors.city && errors.city.type === "required"}
              helperText={
                errors.city &&
                errors.city.type === "required" &&
                "this field is required"
              }
            />
            <TextField {...register(`phone`)} label="phone" />
            <TextField {...register(`website`)} label="website" />

            <input type="submit" />
          </form>

          <Button onClick={() => dispatch(fetchPostsByUserId(id))}>
            Get user's posts
          </Button>
          {userPosts && userPosts.length > 0 && (
            <>
              <ListItem button onClick={() => handleCollapse("posts")}>
                {renderCollapseIcon(collapsedState.posts)}
                <ListItemText
                  primary={collapsedState.posts ? "Hide posts" : "Show posts"}
                />
              </ListItem>

              <Collapse in={collapsedState.posts} timeout="auto" unmountOnExit>
                <List>
                  {userPosts.map((post) => (
                    <ListItem key={`post-${post.id}`}>
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

export default UserInfo;
