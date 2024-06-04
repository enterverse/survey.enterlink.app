export const copyToClipboard = async (text: string) => {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
			console.debug("Copied using navigator.clipboard");
			return;
		} catch (reason) {
			console.error(
				"Failed with navigator.clipboard, trying fallback...",
				reason
			);
		}
	}

	// Fallback
	const textarea = document.createElement("textarea");
	textarea.value = text;
	document.body.append(textarea);
	textarea.select();
	try {
		document.execCommand("copy");
		console.debug("Copied using document.execCommand");
	} catch (reason) {
		console.error("Failed to copy text:", reason);
	}
	textarea.remove();
};
