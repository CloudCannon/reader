let enabled = true;

export function toggleLogging(value) {
	enabled = value;
}

function logInfo(text) {
	console.log(text);
}

function logWarning(text) {
	console.warn(text);
}

function logError(text) {
	console.error(text);
}

const levels = {
	info: logInfo,
	warn: logWarning,
	error: logError,
};

export default function log(text, level = "info") {
	if (!enabled) {
		return;
	}

	levels[level](text);
}
