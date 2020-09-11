import React, { useState, FormEvent, useEffect, useContext } from 'react'

import { Context } from '../../context/AuthContext'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

function TeacherList() { 

	const [ teachers, setTeachers ] = useState([{
		avatar: '',
		bio: '',
		cost: 0,
		id: 0,
		account_id: 0,
		name: '',
		subject: '',
		whatsapp: '',
		schedules: [],
		total: 0
		}
	])

	const { handleShowAllTeachers, handleSearchTeachers } = useContext(Context)
 
	const [xPos, setXPos] = useState(0)
	const [yPos, setYPos] = useState(0)

	const [page, setPage] = useState(1)
	const [limit] = useState(3)
	const [totalClasses, setTotalClasses] = useState(0)

	const [ subject, setSubject ] = useState('') 
	const [ week_day, setWeekDay ] = useState('')
	const [ time, setTime ] = useState('')

	function handlePreviousButton() {
		
		if (page === 1) {
			return 
		}

		window.scrollTo(xPos, yPos)
		setPage(page - 1)
	}

	function handleNextButton() {

		if (page === Math.ceil(totalClasses / limit)) {
			return
		}
		window.scrollTo(xPos, yPos)
		setPage(page + 1)
	}

	async function searchTeachers() {
		await handleSearchTeachers(subject, week_day, time, page, limit).then( res => {
			try {
				setTotalClasses(res[0].total)
				setTeachers(res)
			} catch (e) {
				console.log(e)
				console.log('Nenhum professor encontrado')
			}
		})
	}

	useEffect( () => {	

		//Scrolls to top results on classes list
		const rect:any = document.querySelector('main')
		const position = rect.getBoundingClientRect()
		const xPos = position.x
		const yPos = position.y
		setXPos(xPos)
		setYPos(yPos)

		async function showAllTeachers() {
			if (subject === '' || week_day === '' || time === '' ) {

				await handleShowAllTeachers(page, limit, 0).then( res => {
					try {
						setTeachers(res)
						setTotalClasses(res[0].total)
					} catch (e) {
						console.log(e)
						console.log('Nenhum professor encontrado')
					}
				})
			}
		}

		if (!subject || !week_day || !time) {
			showAllTeachers()
		} else {
			searchTeachers()
		}



	}, [page]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers" onSubmit={ (e:FormEvent) => {
					e.preventDefault()
					setPage(1)
					searchTeachers()
					} 
				}>
					<Select 
						name="subject" 
						label="Matéria"
						value= {subject}
						onChange = { e => { setSubject(e.target.value) }}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Ciências', label: 'Ciências' },
							{ value: 'Educação Física', label: 'Educação Física' },
							{ value: 'Física', label: 'Física' },
							{ value: 'Geografia', label: 'Geografia' },
							{ value: 'História', label: 'História' },
							{ value: 'Matemática', label: 'Matemática' },
							{ value: 'Português', label: 'Português' },
							{ value: 'Química', label: 'Química' }
						]} 
					/>
					<Select 
						name="week_day" 
						label="Dia da Semana"
						value= {week_day}
						onChange = { e => { setWeekDay(e.target.value) }}
						options={[
							{ value: '6', label: 'Domingo' },
							{ value: '0', label: 'Segunda-feira' },
							{ value: '1', label: 'Terça-feira' },
							{ value: '2', label: 'Quarta-feira' },
							{ value: '3', label: 'Quinta-feira' },
							{ value: '4', label: 'Sexta-feira' },
							{ value: '5', label: 'Sábado' },
						]} 
					/>
					<Input
						type="time" 
						name="time" 
						label="Hora"
						value= {time}
						onChange = { e => { setTime(e.target.value) }}
					/>

					<button type="submit">
						Buscar
					</button>
				</form>
			</PageHeader>

			<div className="pagination-container">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="pagination-left-button"
					onClick={handlePreviousButton}
				/>
				Página { page } de { Math.ceil(totalClasses / limit) }
				<FontAwesomeIcon
					icon={faChevronRight}
					className="pagination-right-button"
					onClick={handleNextButton}
				/>

			</div>

			<main>
				{(teachers[0].total > 0) && teachers.map((teacher: Teacher, index: number) => {
					return <TeacherItem key={index} teacher={teacher} />
				})}
			</main>
			<div id="footer-pagination-buttons" className="pagination-container">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="pagination-left-button"
					onClick={handlePreviousButton}
				/>
				Página { page } de { Math.ceil(totalClasses / limit) }
				<FontAwesomeIcon
					icon={faChevronRight}
					className="pagination-right-button"
					onClick={handleNextButton}
				/>

			</div>
		</div>
	)
}

export default TeacherList