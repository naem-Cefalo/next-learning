import http from "../../../../../httpService";

const getData = async (url: string) =>
  await http.get(
    `${url}`
  ).then((res) => res.data)

export default getData;