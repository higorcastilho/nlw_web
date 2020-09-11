import React, { useState, FormEvent, useContext } from 'react'

import { Context } from '../../context/AuthContext'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import rocket from '../../assets/images/icons/rocket.svg'

import './styles.css'

import httpService from '../../services/http'

function TeacherForm() {

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

	async function handleCreateClass(id: number) {

		await httpService.post(`classes/${id}`, {
			subject,
			cost: Number(cost),
			schedule: scheduleItems
		}).then(() => {
			alert('Cadastro realizado com sucesso!')
		}).catch(e => {
			console.log(e)
			//alert('Erro ao cadastrar')
		})
	}

	return (
		<div id="page-teacher-form" className="container">
			<PageHeader 
				title="Que incrível que você quer dar aulas."
				description="O primeiro passo é preencher este formulário de inscrição"
				emoji={rocket}
				emojiText="Prepare-se! Vai ser o máximo."
			/>
			<main>
					<form onSubmit={ (e:FormEvent) => {
								e.preventDefault()
								handleCreateClass(account_id)
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
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">
							Salvar cadastro
						</button>
					</footer>
				</form>
			</main>
		</div>
	)
}

export default TeacherForm