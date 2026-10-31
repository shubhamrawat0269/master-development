const response = await fetch("http://192.168.1.11:4000/");

// console.log(response.headers);

response.headers.forEach((key, value) => {
  console.log({ value, key });
});
