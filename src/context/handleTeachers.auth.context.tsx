import httpService from '../services/http'

interface TeacherResponse {
	account_id: number
	name: string
	avatar: string
	bio: string
	cost: number
	subject: string
	whatsapp: string
	id_class_primary: number
	schedules: any[]
	total: number
}

interface ScheduleItem {
	class_id: number
	week_day: number | string
	from: string
	to: string
}

const showSchedules = ():Promise<ScheduleItem[]> => {
	return new Promise( (resolve) => {
		httpService.get('classes-schedules').then( (res) => {
			resolve(res.data)
		})
	})
}

const showTeachers = (page: number, limit: number, account_id: number):Promise<TeacherResponse[]> => {

	return new Promise( (resolve) => {

			httpService.get(`classes/${account_id}`, {
				page, 
				limit
			}).then( (res) => {
				
				const teachersResponse = res.data.results.map( (teacherResponse: TeacherResponse) => {

					const schedules:any[] = []

					return {
						account_id: teacherResponse.account_id,
						name: teacherResponse.name,
						avatar: teacherResponse.avatar,
						bio: teacherResponse.bio,
						cost: teacherResponse.cost,
						subject: teacherResponse.subject,
						whatsapp: teacherResponse.whatsapp,
						id_class_primary: teacherResponse.id_class_primary,
						schedules: schedules,
						total: res.data.total
					}
				})

				resolve(teachersResponse)
			})
	} )
}

export default async function showAllTeachers(page: number, limit: number, account_id: number):Promise<any[]> {
	
	const schedules = await showSchedules()
	
	const teachers = await showTeachers(page, limit, account_id)


	return new Promise( resolve => {
		
		teachers.map( (teacher: TeacherResponse) => {
			schedules.map( (scheduleItem: ScheduleItem) => {
				if (scheduleItem.class_id === teacher.id_class_primary) {
					teacher.schedules.push(scheduleItem)
				}
				return ''
			} )
			return ''
		})

		resolve(teachers)
	})
} 

