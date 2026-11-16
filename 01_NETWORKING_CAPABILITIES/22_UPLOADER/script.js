const inputEle = document.querySelector("input");

inputEle.addEventListener("change", async (e) => {
  //   console.log(e.target.files[0]);
  const fileDetails = e.target.files[0];

  const response = await fetch("http://192.168.1.5:4000/", {
    method: "POST",
    body: fileDetails,
    headers: {
      filename: fileDetails.name,
    },
  });

  const actualData = await response.text();
  console.log(actualData);
});
