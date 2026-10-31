const response = await fetch("http://192.168.1.11:4000");
// console.log(response.headers);

response.headers.forEach((value, key) => {
  console.log({ key, value });
});

// for await (const chunk of response.body) {
//   console.log(chunk);
// }
