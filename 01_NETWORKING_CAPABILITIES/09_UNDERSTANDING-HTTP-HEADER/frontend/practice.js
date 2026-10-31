import net from "node:net";

const server = net.createServer((socket) => {
  // socket.end(
  //   "http/1.1\nusername:Shubham Rawat\nuserage:30\nprofession:AI Engineer\nAccess-Control-Allow-Origin:*\nAccess-Control-Expose-Headers:*\n\n",
  // );

  socket.write("http/1.1\n");
  socket.write("Access-Control-Allow-Origin:*\n");
  socket.write("Access-Control-Expose-Headers:*");
  socket.write("\n\n");
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
