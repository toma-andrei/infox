import axios from "axios";
import { requestIP } from "../../env";

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
  });
};

/**axios({
        method: "post",
        url: "http://" + requestIP,
        data: JSON.stringify({
          url: ,
          method: "get",
          jwt: jwt,
        }),
         
      });
    }; */

export default ajax;
