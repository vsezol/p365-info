const rp = require('request-promise'),
	cheerio = require('cheerio')

const getAnswer = require('./modules/get_answer'),
	{printIntro, printParsedHeaders} = require('./modules/print_data')

const host = 'http://porno365.blog/'

const getHTML = async url => await rp(url)

const getHeaders = async url => {
	const headers = []
	const $ = cheerio.load(await getHTML(url))
	let videosText = $('.videos_ul p')
	videosText.each((i, item) => headers.push(item.children[0].data))
	return headers
}

const parseHeaders = async url => {
	const headers = await getHeaders(url),
		popularWords = []

	let textStr = headers.join(' ').toLowerCase(),
		textSet = [...new Set(textStr.split(' '))]

	textSet
		.filter(i => i.length >= 4)
		.forEach(item => {
			popularWords.push([
				textStr.match(new RegExp(item, 'gi')).length,
				item
			])
		})
	popularWords.sort((a, b) => b[0] - a[0])
	return [headers, popularWords]
}

const app = async url => {
	printIntro()
	const answer = await getAnswer()
	url = answer.split(':')[0] === 'http' ? answer : url
	const data = await parseHeaders(url)
	printParsedHeaders(data)
}
app(host)
