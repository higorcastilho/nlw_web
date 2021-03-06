import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import httpService from '../../services/http'

import Input from '../../components/Input'
import CommonCase from '../../components/CommonCase'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

function ForgotPassword() { 
	
	const history = useHistory()

	const [ email, setEmail ] = useState('')
	const [ buttonCollor, setButtonColor ] = useState('#dcdce5')
	const [ letterCollor, setLetterColor ] = useState('#9c98a6')

	function handleButtonColor() {
		if(email !== '') {
			setButtonColor('#04d361')
			setLetterColor('#ffffff')
		} else if ( email === '') {
			setButtonColor('#dcdce5')
			setLetterColor('#9c98a6')
		}
	}

	async function handleForgotPassword(e: FormEvent) {
		e.preventDefault()
		
		await httpService.post('forgot-password', {
			email
		})
		history.push('/reset-password')
	}

	return (
		<div id="page-forgot-pass">
			<div id="page-forgot-pass-content" >
				<div id="top-bar-container-forgot-pass">
					<Link to="/login">
						<FontAwesomeIcon 
							icon={faLongArrowAltLeft} 
							className="back-arrow-forgot-pass"
						/>
					</Link>
				</div>
				<header className="form-title">
					<strong><p>Eita, esqueceu sua senha?</p></strong>
					<p>Não esquenta, vamos dar um jeito nisso.</p>
				</header>
				<main>
					<form onSubmit={ handleForgotPassword }>
						<fieldset>
							<Input 
								name="email" 
								label="" 
								placeholder="E-mail"
								required
								value={email}
								onChange={ e => {
									setEmail(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
						</fieldset>
						<button type="submit" style={{backgroundColor: buttonCollor, color: letterCollor}}>
							Enviar
						</button>
					</form>
				</main>
			</div>
			<CommonCase mainImg={logoImg} subtitle="Sua plataforma de estudos online"/>
		</div>
	)
}

export default ForgotPassword