const colors = require('colors')

const printIntro = () => {
	const projectName = [
		'',
		'                                 ____   __   ___         _           __',
		' _ __   ___   _ _   _ _    ___  |__ /  / /  | __|  ___  (_)  _ _    / _|  ___',
		"| '_ \\ / _ \\ | '_| | ' \\  / _ \\  |_ \\ / _ \\ |__ \\ |___| | | | ' \\  |  _| / _ \\",
		'| .__/ \\___/ |_|   |_||_| \\___/ |___/ \\___/ |___/       |_| |_||_| |_|   \\___/',
		'|_|'
	]
	const authorName = [
		'                                _                                           _',
		'                               | |__   _  _    __ __  ___  ___   ___  ___  | |',
		"                               | '_ \\ | || |   \\ V / (_-< / -_) |_ / / _ \\ | |",
		'                               |_.__/  \\_, |    \\_/  /__/ \\___| /__| \\___/ |_|',
		'                                       |__/'
	]
	console.log(projectName.join('\n').rainbow.bold)
	console.log(authorName.join('\n').green.bold)
}

const printParsedHeaders = data => {

	console.log('\n', 'Топ 10 популярных слов:')
	data[1].slice(0, 10).forEach((word, i) => {
		console.log(`    ${i + 1}. ${word[1]}`)
	})

	console.log('\n', 'Последние заголовки видео:')
	data[0].forEach((header, i) => {
		console.log(`    ${i + 1}. ${header}`)
	})
}

module.exports = {printIntro, printParsedHeaders}