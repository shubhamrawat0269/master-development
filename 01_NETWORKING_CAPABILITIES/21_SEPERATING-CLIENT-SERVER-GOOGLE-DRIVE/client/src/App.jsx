import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  async function getData() {
    const res = await fetch("http://192.168.1.3:4000/");
    const resInJSON = await res.json();
    console.log(resInJSON);
    setData(resInJSON);
  }
  useEffect(() => {
    getData();
  }, []);

  return <div>Hello From Client React</div>;
}

export default App;
