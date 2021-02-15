import React from "react";
import axios from 'axios';

export default function Home() {
    let [responseData, setResponseData] = React.useState(''); 

    const fetchData = React.useCallback(() => {
        axios({
          "method": "GET",
          "url": "http://localhost:1000/notes"
        })
        .then((response) => {
          setResponseData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }, [])
      React.useEffect(() => {
        fetchData()
      }, []);

    return (
      <div>
        <h2>Home</h2>
        <div>
            {responseData && 
                responseData.map(d => (
                    <li key={d._id}>{d.title}</li>
                ))}
        </div>
      </div>
    );
  }