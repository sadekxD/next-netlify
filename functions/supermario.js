exports.handler = async () => {
	console.log("function ran");

	const data = { name: "marion", age: 35, job: "plumbers" };

	// return response to browser

	return {
		statusCode: 200,
		body: JSON.stringify(data),
	};
};
