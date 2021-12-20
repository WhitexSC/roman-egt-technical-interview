import request from "../../utils/request";

export function fetchPosts(id: number) {
  const postsQuery = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

  return request(postsQuery);
}
