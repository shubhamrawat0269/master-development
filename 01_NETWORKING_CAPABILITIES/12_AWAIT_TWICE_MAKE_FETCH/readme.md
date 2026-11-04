# Important Notes : 

1. Socket needs to end if we want to fetch the actual data in client side.
2. Content-Length will eventually resolve your second await, there's no need to end socket.
3. 1st await resolves when it recieves **\n\n** from server & second await resolves when either it recieves content-len or socket.end