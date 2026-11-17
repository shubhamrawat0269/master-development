import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  async function getData() {
    const res = await fetch("http://192.168.1.5:4000/");
    const resInJSON = await res.json();
    setData(resInJSON);
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleFileChange(e) {
    const fileDetails = e.target.files[0];

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.1.5:4000/", true);
    xhr.setRequestHeader("filename", fileDetails.name);

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        console.log(`Upload Progress: ${progress}%`);
        setProgress(progress);
      }
    };

    xhr.send(fileDetails);
  }

  async function handleDeleteFile(filename) {
    const response = await fetch("http://192.168.1.5:4000/", {
      method: "DELETE",
      body: filename,
    });

    const actualData = await response.text();
    getData();
    console.log(actualData);
  }

  return (
    <div>
      <h1>Doogle Drive</h1>
      <input type="file" onChange={handleFileChange} />
      <div>{`${progress}%`}</div>
      <div>
        {data.map((item, id) => {
          return (
            <div key={id} className="container">
              <p>{item}</p>
              <div className="container">
                <a href={`http://192.168.1.5:4000/${item}?action=preview`}>
                  Preview
                </a>
                <a href={`http://192.168.1.5:4000/${item}?action=download`}>
                  Download
                </a>
                <button onClick={() => handleDeleteFile(item)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
