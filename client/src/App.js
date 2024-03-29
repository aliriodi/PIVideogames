import './App.css';
import { Route,Switch,} from "react-router-dom";
import LandingPage from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";
import Pagination from "./components/Pagination/Pagination";
import  VcardDetail  from './components/VcardDetail/VcardDetail';
import  CreateV  from './components/CreateV/CreateV.jsx';


function App() {
  return ( 
    <div className="App">
      <Switch>
      <Route exact path = "/" component = {LandingPage} />
      <Route exact path = "/home/create" component = {CreateV} />
      <Route path = "/home" component = {Nav}/>
      <Route exact path = "/home" component = {Pagination}/>
      <Route exact path="/videogames/:id" component={VcardDetail } />
      <Route path = "/videogames" component = {Nav}/>
      </Switch>
    </div>
  );
}

export default App;
