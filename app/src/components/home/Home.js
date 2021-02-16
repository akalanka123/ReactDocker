import React from "react";
import axios from "axios";
import "./Home.scss";
import NewsEdit from "./../newsEdit/NewsEdit";
import NewsAdd from "./../newsAdd/NewsAdd";

export default function Home() {
  let [responseData, setResponseData] = React.useState("");

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "http://localhost:1000/notes",
    })
      .then((response) => {
        setResponseData(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Home <NewsAdd></NewsAdd></h2>
      
      <div>
        {responseData &&
          responseData.map((d) => (
            <div key={"wrapper" + d._id}>
              <li className="news-header" key={"header" + d._id}>
                {d.title}<span>   </span><NewsEdit id={d._id}></NewsEdit>
              </li>
              <p className="news-content">{d.content}</p>
              
            </div>
          ))}
      </div>
    </div>
  );
}
