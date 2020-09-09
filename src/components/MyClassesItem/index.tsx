import React from 'react'
import { Link } from 'react-router-dom'

import convertMinutesToHours from '../../utils/convertMinutesToHours'

import './styles.css'

export interface Teacher {
	avatar?: string
	bio?: string
	cost: number
	id: number
	account_id: number
	id_class_primary: number
	name?: string
	subject: string
	whatsapp?: string
	schedules: any[]
}

interface MyClassesItemProps {
	teacher: Teacher
}

const MyClassesItem: React.FC<MyClassesItemProps> = ({ teacher }) => {

	function handleWeekDay(day: number) {
		switch (day) {
			case 6:
				return 'Domingo' 
			case 0:
				return 'Segunda' 
			case 1:
				return 'Terça' 
			case 2:
				return 'Quarta' 
			case 3:
				return 'Quinta' 
			case 4:
				return 'Sexta' 
			case 5:
				return 'Sábado' 
		}
	}

	const week_days:any[] = [

		{ week_day: 0, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 1, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 2, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 3, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 4, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 5, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 6, to: 0, from: 0, id: 0, class_id: 0 }
	]

	return (
		<article className="my-classes-item">	
			<header>
				<div>
					<span id="my-classes-span">{teacher.subject}</span>
				</div>
			</header>

			<div id="teacher-item-schedule-card">

				{ 
					week_days.map( (item, index) => {
						
						teacher.schedules.map( schedule => {

							if (item.week_day === schedule.week_day) {
								week_days[index] = schedule
							} //else {
								//week_days[index] = week_days[index]
							//}

							return ''
						})

						const [ fromHour, fromMinutes ] = convertMinutesToHours(week_days[index].from)
						const [ toHour, toMinutes ] = convertMinutesToHours(week_days[index].to)
						const day = handleWeekDay(week_days[index].week_day)

						if (!week_days[index].to && !week_days[index].from) {
							return <section style={{opacity: "0.45"}}>
									<p>Dia</p>
									<strong>{ day }</strong>
									<p> Horário</p>
									<strong> - </strong>
								</section>
						} else {
							return <section>
									<p>Dia</p>
									<strong>{ day }</strong>
									<p> Horário</p>
									<strong>{fromHour}:{fromMinutes} - {toHour}:{toMinutes}</strong>
								</section>
						}
					})
			 	}

			</div>

			<footer>
				<p>
					Preço/hora
					<strong>R$ {teacher.cost}</strong>
				</p>
				<Link  
					to={{
						pathname:"/edit-delete-class",
						search:`?class_id=${teacher.id_class_primary}`
					}}
				>
					Editar/Excluir
				</Link>
			</footer>
		</article>
	)
}

export default MyClassesItem