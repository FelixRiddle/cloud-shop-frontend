import deleteRequest from "./request/deleteRequest";
import getRequest from "./request/getRequest";
import postRequest from "./request/postRequest";
import putRequest from "./request/putRequest";

export const getClients = () => getRequest("/client");
export const createClient = (data) => postRequest("/client", data);
export const getClient = (id) => getRequest(`/client/${id}`);
export const updateClient = (data, id) => putRequest(`/client/${id}`, data);
export const deleteClient = (id) => deleteRequest(`/client/${id}`);
// Weird, it doesn't work when using '/product', but client route has the same configuration
// in the server yet it works.
export const getProducts = () => getRequest("/product/");
export const deleteProduct = (id) => deleteRequest(`/product/${id}`);
export const createProduct = (data) => postRequest("/product", data);
