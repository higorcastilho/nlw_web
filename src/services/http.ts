import Axios from 'axios'
import { getToken } from './auth'
import config from '../config'

export const baseURL = function(url: string) {
	return config.API_HOST_DEV + ( url.startsWith('/') ? url : `/${url}` )
}

export const authHeader = function() {
	const token = getToken()
	if (token) {
		//config.headers.Authorization = `Bearer ${token}`
		return { 'x-access-token': token }
	} else {
		return {}
	}
}


export default {
	get(url: string, header = {}, absolute = false) {
		url = absolute ? url : baseURL(url)
		return Axios.get(url, { headers: Object.assign(header, authHeader()) })
	},
	post(url: string, data: any, header = {}, absolute = false) {
		url = absolute ? url : baseURL(url)
		return Axios.post(url, data, { headers: Object.assign(header, authHeader()) })
	},
	put(url: string, data: any, header = {}, absolute = false) {
		url = absolute ? url : baseURL(url)
		return Axios.put(url, data, { headers: Object.assign(header, authHeader()) })
	},
	delete(url: string, header = {}, absolute = false) {
		url = absolute ? url : baseURL(url)
		return Axios.delete(url, { headers: Object.assign(header, authHeader()) })
	}
}