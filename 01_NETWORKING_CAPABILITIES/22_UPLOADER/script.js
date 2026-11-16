const inputEle = document.querySelector("input");

inputEle.addEventListener("change", async (e) => {
  //   console.log(e.target.files[0]);
  const fileDetails = e.target.files[0];

  // const response = await fetch("http://192.168.1.5:4000/", {
  //   method: "POST",
  //   body: fileDetails,
  //   headers: {
  //     filename: fileDetails.name,
  //   },
  // });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://192.168.1.5:4000/", true);
  xhr.setRequestHeader("filename", fileDetails.name);

  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      console.log(`Upload Progress: ${progress}%`);
    }
  };

  xhr.send(fileDetails);

  // const actualData = await response.text();
  // console.log(actualData);
});
