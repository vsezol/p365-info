const rp = require('request-promise')
const cheerio = require('cheerio')

const host = 'http://porno365.blog/'

const getHTML = async url => {
	return await rp(url)
}

const getHeaders = async url => {
	const headers = []
	const $ = cheerio.load(await getHTML(url))
	const videosText = $('.videos_ul p')
	for (let i = 0; i < videosText.length; i++) {
		headers.push(videosText[i].children[0].data)
	}
	return headers
}
getHeaders(host).then(t => {
	console.log('Последние заголовки видео:')
	t.slice(0, 5).forEach((header, i) => {
		console.log(`    ${i + 1}. ${header}`)
	})
})