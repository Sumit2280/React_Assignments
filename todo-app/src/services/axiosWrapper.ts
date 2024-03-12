import axios from "axios";
const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const getRequest = async () => {
  return await client.get("");
};

const deleteRequest = async (id: number) => {
  return await client.delete(`/${id}`);
};

const updateRequest = async (id: number, payload: {}) => {
  return await client.put(`/${id}`, payload);
};

const showRequest = async (id: string) => {
  return await client.get(`/${id}`);
};

const postRequest = async (payload: {}) => {
  return await client.post("", payload);
};

export { getRequest, deleteRequest, updateRequest, showRequest, postRequest };
