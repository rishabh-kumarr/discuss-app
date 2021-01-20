const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./router')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origins: ['https://discussion-application.herokuapp.com/'],
	},
})

app.use(cors())
app.use(router)

io.on('connection', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room })

		if (error) return callback(error)

		socket.join(user.room)

		socket.emit('message', {
			user: 'Admin',
			text: `${user.name}, Welcome to Room ${user.room}.`,
		})
		socket.broadcast.to(user.room).emit('message', {
			user: 'Admin',
			text: `${user.name} has entered the chat!`,
		})

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room),
		})

		callback()
	})

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id)

		io.to(user.room).emit('message', { user: user.name, text: message })

		callback()
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id)

		if (user) {
			io.to(user.room).emit('message', {
				user: 'Admin',
				text: `${user.name} left.`,
			})
			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room),
			})
		}
	})
})

server.listen(process.env.PORT || 5000, () =>
	console.log(`Server up and running on PORT: ${process.env.PORT || 5000}`)
)
