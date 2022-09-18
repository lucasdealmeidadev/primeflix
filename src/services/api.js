import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '29635cea469d75e2285ac15ee8e2356e',
		language: 'pt-BR'
	}
});

export default api;