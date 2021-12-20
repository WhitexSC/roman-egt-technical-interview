import request from "../../utils/request";

export function fetchUsers() {
  const usersUrl = "https://jsonplaceholder.typicode.com/users";

  return request(usersUrl);
}
