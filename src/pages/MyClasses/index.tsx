import React, { useState, FormEvent, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../context/AuthContext'

import PageHeader from '../../components/PageHeader'
import MyClassesItem, { Teacher } from '../../components/MyClassesItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import successBackground from '../../assets/images/success-background.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

//import api from '../../services/api'

import './styles.css'

function MyClasses() { 

	const [ teachers, setTeachers ] = useState([{
		id: 0,
		id_class_primary: 0,
		account_id: 0,
		subject: '',
		cost: 0,
		schedules: []
		}
	])

	const { handleShowAllTeachers, user } = useContext(Context)
 
	const [xPos, setXPos] = useState(0)
	const [yPos, setYPos] = useState(0)

	const [page, setPage] = useState(1)
	const [limit] = useState(5)
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

	useEffect( () => {	

		//Scrolls to top results on classes list
		const rect:any = document.querySelector('main')
		const position = rect.getBoundingClientRect()
		const xPos = position.x
		const yPos = position.y
		setXPos(xPos)
		setYPos(yPos)

		const data = handleShowAllTeachers(page, limit, user.account_id)
		data.then( res => {
			try {
				setTeachers(res.map( teacherClass => {
					return {
						id: teacherClass.id,
						id_class_primary: teacherClass.id_class_primary,
						account_id: user.account_id,
						subject: teacherClass.subject,
						cost: teacherClass.cost,
						schedules: teacherClass.schedules
					}
				}))
				setTotalClasses(res.length)
			} catch (e) {
				console.log(e)
				console.log('Nenhum professor encontrado')
			}
		})

	}, [page]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div id="page-my-classes" className="container">
			<header 
				id="my-classes-header" 
				className="my-classes-header-top-bar"
				
			>
				<div className="top-bar-container-profile">
					<Link to="/profile">
						<img src={backIcon} alt="Voltar" />
					</Link>
					<img src={logoImg} alt="Proffy" />
				</div>
			</header>
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
				{teachers && teachers.map((teacher: Teacher, index: number) => {
					return <MyClassesItem key={index} teacher={teacher} />
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

export default MyClasses