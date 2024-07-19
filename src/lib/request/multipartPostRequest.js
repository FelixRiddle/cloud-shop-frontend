"use server";

import axios from "axios";
import apiUrl from "../config/apiUrl";

/**
 * Multipart post request
 */
export default async function multipartPostRequest(endpoint, formData) {
	try {
		const url = apiUrl();
		
		let headers = {
			'Content-Type': 'multipart/form-data',
		};
		
		const instance = axios.create({
			baseURL: url,
			headers
		});
		
		const response = await instance.post(endpoint, formData);
		
		const data = response.data;
		
		return data;
	} catch(err) {
		if(err.response) {
			const data = err.response.data;
			return data;
		}
		
		console.error(err);
		
		return undefined;
	}
}
