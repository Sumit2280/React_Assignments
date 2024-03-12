import { useCallback, useEffect, useState } from "react";
import IToDo from "../interfaces/Todo";
import { getRequest } from "../services/axiosWrapper";

const useFetch = () => {
  const [response, setResponse] = useState<IToDo[]>([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [shouldRefetch, refetch] = useState({});

  const fetchData = useCallback(async () => {
    getRequest()
      .then((data) => {
        setResponse(data.data);
        setLoader(false);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, shouldRefetch]);

  return { response: response, error: error, loader: loader, refetch: refetch };
};

export default useFetch;
