1. We can create an http server using tcp module i.e. net as well.
2. Directly, chrome doesn't support tcp connection untill you type 'http\n\n' in the socket.end or socket.write method.
3. http/1.1\n\n to remove in firefox which determine version.
4. http protocol in dev tool.
5. Exist version is shown in dev tool . if not, then fallback to v1.0
6. 3 way handshake using wireshark.
7. Once client make connection with server, it expects server to send something. For more info, see wireshark.
8. Download files from server and transfer to client using streams.
9. What we did ? - We send mp4 file using streams from server to any client whether it is mobile, laptop.
10. Browsers automatically handle streams.