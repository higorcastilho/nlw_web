import React, { createContext, useState } from 'react'

import handleLogin from './login.auth.context'
import handleUser from './user.auth.context'
import showAllTeachers from './handleTeachers.auth.context'
import searchTeachers from './handleSearchTeachers.auth.context'

interface AuthContextData {
	authenticated: boolean
	user: {
		userId: number
		name: string
		avatar: string
		whatsapp: string
		bio: string
		account_id: number
		firstName: string
		lastName: string
		email: string
	}

	signIn(email:string, password:string):Promise<void>
	handleUserInfo():Promise<void>
	handleShowAllTeachers(page: number, limit: number, account_id: number):Promise<any[]>
	handleSearchTeachers(subject: string, week_day: number | string, time: string, page: number, limit: number):Promise<any[]>

}

export const Context = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ( { children } ) => {

	const [ user, setUser ] = useState({
		userId: 0,
		name: '',
		avatar: '',
		whatsapp: '',
		bio: '',
		account_id: 0,
		firstName: '',
		lastName: '',
		email: ''
	})

	const [ authenticated, setAuthenticated ] = useState(false)

	async function handleUserInfo() {

		const { 
			userId,
			name,
			avatar,
			whatsapp,
			bio,
			account_id,
			firstName,
			lastName,
			email 
		} = await handleUser()

		setUser({
			userId,
			name,
			avatar,
			whatsapp,
			bio,
			account_id,
			firstName,
			lastName,
			email 
		})

	}

	async function signIn(email:string, password:string) {

		const { signed } = await handleLogin(email, password)
		if (signed) {
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}

	async function handleShowAllTeachers(page: number, limit: number, account_id: number) {
		const teachersData = await showAllTeachers(page, limit, account_id)
		return teachersData
	}

	async function handleSearchTeachers(subject: string, week_day: number | string, time: string, page: number, limit: number) {
		const teachersData = await searchTeachers(subject, week_day, time, page, limit)
		return teachersData
	}

	return (
		<Context.Provider value={ { authenticated, user, signIn, handleUserInfo, handleShowAllTeachers, handleSearchTeachers } }>
			{ children }
		</Context.Provider>
	)
}
