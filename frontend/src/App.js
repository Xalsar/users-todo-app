import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import MainList from "./containers/MainList/MainList";
import Progress from "./containers/Progress/Progress";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/progress" exact><Progress/></Route>
        <Route path="/" exact><MainList/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
