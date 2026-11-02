# Important Notes To Remember

1. **Content-Length: 2** header will fetch 2 bytes data and terminate the socket by itself.
2. Each emoji occupies **4 bytes** space.
3. We have to tell browser to encode utf-8 by setting header in server.
  i.e. ==> **Content-Type: text/txt; charset=utf-8**

4. Do practical to understand how Content length & Type works?
5. What are the uses of defining Content-length in server using dynamic file size value.

6. Process to follow: 
 A. Open file
 B. Sieze file size 
 C. createReadStream
 D. Set content-length with size value
 E. pipe readstream to socket.

NOTE : using dynamic Content-length will tell browser additional size info of assets server sending so that browser use information to improve user experience.

7. Content-Type define what type of content we're sending
to client i.e. MIME type of assets.

8. "Content-Disposition: attachment; filename=hello.pdf"
9. "Content-Disposition: inline; filename=hello.pdf"