import axios from "axios";

// const ajax = (url, method, jwt, body) => {
//   return axios({
//     method: "post",
//     url: "http://" + requestIP,
//     data:
//       method === "get"
//         ? { url: url, jwt: jwt, method: "get" }
//         : { url: url, jwt: jwt, ...body },
//   });
// };

const ajax = (url, method, jwt, body) => {
  return axios({
    method: method,
    url: url,
    data: body,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).catch((err) => {});
};

export default ajax;
