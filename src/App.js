import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";
import Location from "./pages/Location/Location";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/location/:id" exact Component={Location} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile/:id" exact Component={Profile} />

        <AdminTemplate path="/signin" exact Component={Signin} />
        <AdminTemplate path="/signup" exact Component={Signup} />
        <HomeTemplate path="/" Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
