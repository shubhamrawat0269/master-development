const response = await fetch("http://192.168.1.13:4000");
console.log(response);

const resInJSON = await response.json();
console.log(resInJSON);
