const express = require('express');

const app = express();
const port = 3000;


app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

const listen = require('socket.io');
const io = listen(server);

const color = [ // 무작위로 상용자 색 지정
    "yellow",
    "green",
    "red",
    "blue",
    "white",
    "black",
]

io.on('connection',(socket)=>{

    const username = color[ Math.floor(Math.random() * 6) ]; //0 ~ 5 까지  할당
    
    socket.broadcast.emit( 'join',  {  username  } ); //페이지에 입장한 것을 다른 사람들에게 알려줌

    // console.log('소켓 확인'); 서버 확인
     socket.on('client message', (data) => { // socket.on message 받기 대기
     //    console.log(data); // client message 확인
        io.emit('server message', { //연결된 모든 사람에게 전송
            //io.broadcast.emit 자신을 제외한 사용자에게 메시지 전달
           username ,
            message : data.message // 접근
        });
     });

     socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { username });
    });

});


