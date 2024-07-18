import getRequest from "./request/getRequest";
import postRequest from "./request/postRequest";

export const getClients = () => getRequest("/client");
export const createClient = (data) => postRequest("/client", data);
