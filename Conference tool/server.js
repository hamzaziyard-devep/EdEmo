const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);

app.use(express.static('public'))
app.use('/css',express.static(__dirname+ 'public/css'))
app.use('/js',express.static(__dirname+ 'public/js'))
app.use('/img',express.static(__dirname+ 'public/img'))
app.use('/video',express.static(__dirname+ 'public/video'))


app.set('views','./views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
  res.render('home')
})


app.get('/aboutteam',(req,res)=>{
  res.render('aboutteam')
})

app.get('/aboutapp',(req,res)=>{
  res.render('aboutapp')
})



app.get('/leave',(req,res)=>{
  res.render('leave')
})

app.get('/results',(req,res)=>{
  res.render('results')
})

app.get('/room', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})




io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})


server.listen(5000)