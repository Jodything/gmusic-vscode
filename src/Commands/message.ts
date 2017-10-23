export interface message {
	namespace: string,
	method: string,
	requestID?: number,
	arguments?: [any]
}