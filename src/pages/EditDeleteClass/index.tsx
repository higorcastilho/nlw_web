import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'


import { Context } from '../../context/AuthContext'

import convertMinutesToHours from '../../utils/convertMinutesToHours'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import rocket from '../../assets/images/icons/rocket.svg'
import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import successBackground from '../../assets/images/success-background.svg'

import './styles.css'


function EditDeleteClass() {

	const history = useHistory()

	const { user: { account_id } } = useContext(Context)

	const [subject, setSubject] = useState('')
	const [cost, setCost] = useState('')

	const [scheduleItems, setScheduleItems] = useState([
		{ week_day: 0, from: '', to: '' }
	])

	function addNewScheduleItem() {
		setScheduleItems([
			...scheduleItems,
			{ week_day: 0, from: '', to: '' }
		])
	}

	function setScheduleItemValue(position: number, field: string, value: string) {
		const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value }
			}
			return scheduleItem
		})
			setScheduleItems(updatedScheduleItem)
	}

	async function handleDeleteClass() {
		const urlParams = new URLSearchParams(window.location.search)
		const class_id= urlParams.get('class_id')

		await api.delete(`class-by-id/${class_id}`).then( () => {
			history.push('/my-classes')
			alert('Aula deletada com sucesso')
		})
	}

	async function handleUpdateClass() {
		const urlParams = new URLSearchParams(window.location.search)
		const class_id= urlParams.get('class_id')
		console.log(scheduleItems)

		await api.post(`classes-update/${class_id}`, {
			subject,
			cost,
			scheduleItems
		}).then( () => {
			history.push('/my-classes')
			alert('Aula alterada com sucesso')
		})		
	}

	async function handleCreateClass(id: number) {

		await api.post(`classes/${id}`, {
			subject,
			cost: Number(cost),
			schedule: scheduleItems
		}).then(() => {
			alert('Cadastro realizado com sucesso!')
		}).catch(e => {
			alert('Erro ao cadastrar')
			console.log(e)
		})
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const class_id= urlParams.get('class_id')

		async function getClassById() {
			await api.get(`class-by-id/${class_id}`).then( res => {
				
				setSubject(res.data.subject)
				setCost(res.data.cost)
				setScheduleItems([
					...res.data.schedule.map( (schedule: any) => {

						const [fromHours, fromMinutes] = convertMinutesToHours(schedule.from)
						const [toHours, toMinutes] = convertMinutesToHours(schedule.to)
						return {
							schedule_id: schedule.id,
							week_day: schedule.week_day,
							from: `${fromHours}:${fromMinutes}`,
							to: `${toHours}:${toMinutes}`
						}
					})
				])
			})
		}

		getClassById()

	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div id="page-edit-delete-class" className="container">
			<header
				id="edit-delete-class-class" 
				className="edit-delete-class-class-top-bar" 
			>
				<div className="top-bar-container-profile">
					<Link to="/my-classes">
						<img src={backIcon} alt="Voltar" />
					</Link>
					<img src={logoImg} alt="Proffy" />
				</div>
			</header>
			<main>
					<form onSubmit={ (e:FormEvent) => {
								e.preventDefault()
								handleUpdateClass()
							} 
						}
					>
					<fieldset>
						<legend>Sobre a aula</legend>
							<Select 
								name="subject" 
								label="Matéria"
								value={subject}
								onChange = {(e => {
									setSubject(e.target.value)
								})}
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
							<Input 
								name="cost" 
								label="Custo da sua hora por aula" 
								value={cost}
								onChange = {(e => {
									setCost(e.target.value)
								})}
							/>
					</fieldset>
					<fieldset>
						<legend>
							Horários disponíveis
							<button type="button" onClick={addNewScheduleItem}>
								+ novo horário
							</button>
						</legend>

						{scheduleItems.map((scheduleItem, index) => {
							return (
								<div key={scheduleItem.week_day} className="schedule-item">
									<Select
										name="week_day"
										label="Dia da Semana"
										value={scheduleItem.week_day}
										onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
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
										name="from" 
										label="Das" 
										type="time"
										value={scheduleItem.from}
										onChange={e => setScheduleItemValue(index, 'from', e.target.value) } 
									/>
									<Input 
										name="to" 
										label="Até" 
										type="time"
										value={scheduleItem.to}
										onChange={e => setScheduleItemValue(index, 'to', e.target.value) } 
									/>
								</div> 
							)
						})}
						
					</fieldset>

					<footer>
						<button type="submit">
							Salvar alterações
						</button>
						<button type="button" onClick={handleDeleteClass} >
							Deletar aula
						</button>
					</footer>
				</form>
			</main>
		</div>
	)
}
export default EditDeleteClass