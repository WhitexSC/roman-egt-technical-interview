import React from "react";
import {
  Paper,
  TextField,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import type { CollapseActionType } from "../../pages/Home/types";

type UserInfoProps = {
  id: number;
  handleCollapse: CollapseActionType;
  register: any;
};

const UserInfo = (props: UserInfoProps) => {
  const { id, handleCollapse, register } = props;

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
            <TextField {...register(`${id}.name`, { required: true })} />
            <TextField {...register(`${id}.username`, { required: true })} />
            <TextField
              {...register(`${id}.email`, {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <TextField {...register(`${id}.street`, { required: true })} />
            <TextField {...register(`${id}.suite`, { required: true })} />
            <TextField {...register(`${id}.city`, { required: true })} />
            <TextField
              {...register(`${id}.phone`, { minLength: 6, maxLength: 12 })}
            />
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

export default UserInfo;
