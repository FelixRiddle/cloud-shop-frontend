export const API_PORT = process.env.API_PORT || 3008;

/**
 * Api url
 */
export default function apiUrl() {
	return `http://localhost:${API_PORT}`;
}
