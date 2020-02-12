const rp = require('request-promise'),
	cheerio = require('cheerio')

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

parseHeaders(host).then(sp => {
	console.log('Топ 10 популярных слов:')
	sp[1].slice(0, 10).forEach((word, i) => {
		console.log(`    ${i + 1}. ${word[1]}`)
	})
	console.log('\n', 'Последние заголовки видео:')
	sp[0].forEach((header, i) => {
	console.log(`    ${i + 1}. ${header}`)
	})
})