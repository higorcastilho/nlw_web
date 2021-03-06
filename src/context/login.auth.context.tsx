import httpService from '../services/http'
//import jwtDecode from '../services/jwtDecode'
import { login } from '../services/auth'

interface Response {
	signed: boolean
}

export default function handleLogin(email:string, password:string):Promise<Response> {
	return new Promise( resolve => {
		httpService.post('login', {
			email, 
			password
		}).then( async res => {
			const token = res.data.token
			//const userId = jwtDecode(token) commented to deploy

			if (token === undefined) {
				throw new Error('Invalid token');
			}

			await login(token)
			resolve({ signed: true })
			
		}).catch( err => {
			console.log(err)
		})
	})
}