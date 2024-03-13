import IToDo from "../interfaces/Todo";
import { queryRequest } from "../services/axiosWrapper";
import { useQuery } from "react-query";

const useFetch = (page: number, sortKey: string, filterKey: string) => {
  const gettodo = async () => {
    let res;
    if (filterKey) {
      res = await queryRequest(
        `?_limit=2&_page=${page}&_sort=${sortKey}&isCompleted=${filterKey}`
      );
    } else {
      res = await queryRequest(`?_limit=2&_page=${page}&_sort=${sortKey}`);
    }
    return res.data;
  };
  const initialData: IToDo[] = [];
  const { data, error, isLoading } = useQuery({
    initialData: initialData,
    queryKey: ["todos", page, filterKey, sortKey],
    queryFn: gettodo,
  });

  return { response: data, error: error, loader: isLoading };
};

export default useFetch;
