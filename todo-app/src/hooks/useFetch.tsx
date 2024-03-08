import axios from "axios";
import { useEffect, useState } from "react";
import IToDo from "../interfaces/Todo";

const useFetch = (url: string) => {
  const [response, setResponse] = useState<IToDo[]>([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [shouldRefetch, refetch]= useState({})

  const fetchData = async () => {
    await axios
      .get(url)
      .then((data) => {
        setResponse(data.data);
        setLoader(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    fetchData();
  }, [url,shouldRefetch]);

  return { response: response, error: error, loader: loader, refetch:refetch };
};

export default useFetch;

