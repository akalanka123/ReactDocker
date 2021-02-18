import "./App.scss";
import Main from "./routing/Main";
import ReactNotifications from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
function App() {
  return (
    <div>
      <ReactNotifications />
      <div className="container">
        <Main />
      </div>
    </div>
  );
}

export default App;
