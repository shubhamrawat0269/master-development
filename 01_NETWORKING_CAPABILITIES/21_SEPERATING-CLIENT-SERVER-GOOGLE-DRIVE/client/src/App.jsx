import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  async function getData() {
    const res = await fetch("http://192.168.1.5:4000/");
    const resInJSON = await res.json();
    setData(resInJSON);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Doogle Drive</h1>
      <div>
        {data.map((item, id) => {
          return (
            <div key={id}>
              <p>{item}</p>
              <div>
                <a href={`http://192.168.1.5:4000/${item}?action=preview`}>
                  Preview
                </a>
                <a href={`http://192.168.1.5:4000/${item}?action=download`}>
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
