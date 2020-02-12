const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

module.exports = getAnswer = () => {
	return new Promise(res => {
		rl.question('Set the url (optionally): ', answer => {
			res(answer)
			rl.close()
		})
	})
}