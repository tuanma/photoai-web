export const environment = {
	production: false,
};
export const config = {
	//apiGateway: 'http://localhost:7755',
	apiGateway: 'https://api.easypayment.space',
	profile: 'local',
	version: 'v1',
	jwtClientId: '123',
	jwtClientSecret: '123',
	Paddle_Product_ID_Starter: '775148',
	Paddle_Vendor_ID: '149469',
	Paddle_API_Key: '3afeaf2abe6bc684dafc0a73de095916',
	stripe: 'pk_test_51RGrmiELymMhLZEfHLgd2yY0CZICtHYLzY8iAh0mxjobFOTznjnws0zToSdmvc55Zrg51ybtMfJ3JA9h9Cx6G0wY00ovNy1H2H',
}

export const api = {
	baseUrlApi: config.apiGateway + '/' + config.version
}