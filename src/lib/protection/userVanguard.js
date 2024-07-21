/**
 * Redirect to login if there's no user
 */
export default function userVanguard(user) {
	if(!user || !user._id) {
		window.location.href = "/auth/login";
	}
}
