import './App.css';
import { Route,Switch,} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav"
function App() {
  return ( 
    <div className="App">
      <Switch>
      <Landing exact path="/" />
      <Nav  path="Home"/>
     {/* <Route exact path="/Home" component={Home} />
      <Route exact path="/dogs/create" component={CreateDog} />
      <Route exact path="/dogs/:id" component={DogDetail} />*/}
      </Switch>
    </div>
  );
}

export default App;
