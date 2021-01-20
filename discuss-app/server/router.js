const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('Welcome to Discussion API!').status(200)
})

module.exports = router
