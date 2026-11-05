## Important points

1. Event trigger -- **connection** recieves socket as 2nd argument.
2. Below code work exactly just like your TCP connection:

--------------
server.on("connection", (socket) => {
  socket.end("http/1.1 200 Ok\n\nHii from http server");
});

Note : connection event is generally not used in http. *request* event is used.
--------------

3. Term : Connection Alive for future lecture.
4. req is readableStream & res is writableStream

5. In socket, we used to recieve request headers along with the data when client sends data to server. But in case of http req stream, it will only contain request body portion only.




