import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
	baseURL:'https://proffy-deploy-hc.herokuapp.com/' //'http://localhost:3333'
})

api.interceptors.request.use( async config => {
	const token = getToken()
	if (token) {
		//config.headers.Authorization = `Bearer ${token}`
		config.headers = { 'x-access-token': token }
	}

	return config
} )

export default api