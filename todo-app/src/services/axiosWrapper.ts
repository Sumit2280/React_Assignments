import axios from "axios";
const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const getRequest = async () => {
  return await axiosClient.get("");
};

const deleteRequest = async (id: number) => {
  return await axiosClient.delete(`/${id}`);
};

const updateRequest = async (id: number, payload: {}) => {
  return await axiosClient.put(`/${id}`, payload);
};

const showRequest = async (id: string) => {
  return await axiosClient.get(`/${id}`);
};

const postRequest = async (payload: {}) => {
  return await axiosClient.post("", payload);
};

const queryRequest = async (query: string) => {
  return await axiosClient.get(`${query}`);
};

export {
  getRequest,
  deleteRequest,
  updateRequest,
  showRequest,
  postRequest,
  queryRequest,
};
