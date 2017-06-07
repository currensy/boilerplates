export default class DataService {
	
	constructor($http) {
		this.$http = $http;

	}

	

	readData() {
		return this.$http({method: 'GET', url:'https://jsonplaceholder.typicode.com/users'});
	} 
	
}

DataService.$inject = ['$http'];