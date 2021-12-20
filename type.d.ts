type CollapsedEntityType = "users" | "posts";

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

type PostsAction = {
  type: string;
  payload: Array<Post>;
};
type UsersAction = {
  type: string;
  payload: Array<User>;
};

type PostsState = {
  posts: null | Array<Post>;
};

type UsersState = {
  users: null | Array<User>;
};

type DispatchType = (
  args: PostsAction | UsersAction
) => PostsAction | UsersAction;
