
/**
 * Check if a request was successful
 */
export function requestWasSuccessful(responseData) {
	if(!responseData) {
		return false;
	}
	
	if(responseData.messages) {
		for(const message of responseData.messages) {
			if(message.error || message.type === "error") {
				return false;
			}
		}
	}
	
	return true;
}
