Important notes : 

1. Server response is divided into two parts with \n\n: 
  A. Response Headers
  B. Response Data

2. Actual Headers is also seperated by \n with: 
   http versions & status code with a text like 
   'http/1.1 200 Okay'  +  '\nusername:Shubham Rawat'

3. Response Headers list ---
   Access-Control-Allow-Origin:*

4. By Default, browsers do not allow different origin to access its resource, that's why CORS occur. In that case, we have to set header in server i.e.
Access-Control-Allow-Origin:*

5. Just like CORS, browser also block users to access headers. To allow this, we have 
Access-Control-Expose-Headers:*
