export default function convertMinutesToHours (time: number) {
	const hour = Math.trunc(time / 60)
	const minutes = (time % 60)
	const twoDigitHours = ("0"+hour).slice(-2)
	const twoDigitMinutes = ("0"+minutes).slice(-2)
	return [twoDigitHours, twoDigitMinutes]
}