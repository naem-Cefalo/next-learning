import http from "../../../../../httpService";

const postData = async (url: string, data: void) =>
  await http.post(
    `${url}`, data
  ).then((res) => res.data)

export default postData;