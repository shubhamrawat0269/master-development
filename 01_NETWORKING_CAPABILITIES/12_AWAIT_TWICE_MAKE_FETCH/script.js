const response = await fetch("http://192.168.1.13:4000");
// console.log(response);

// const textDecoder = new TextDecoder();
// for await (const chunk of response.body) {
//   console.log(textDecoder.decode(chunk));
// }

const resInJSON = await response.json();
console.log(resInJSON);
