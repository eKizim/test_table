import axios from "axios";

async function fetchData() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
}

export default fetchData;
