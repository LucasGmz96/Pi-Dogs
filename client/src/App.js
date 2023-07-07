import './App.css';
import Landing from "./views/Landing/Landing.jsx"
import Home from "./views/Home/Home.jsx"
import Form from "./views/Form/Form.jsx"
import Detail from "./views/Detail/Detail.jsx"
import {Router,Route} from "react-router-dom"
import React from "react";




function App() {
  return (
  <div className="App">
 
    <Route />
    <Route exact path='/' render={()=><Landing/>}/>
    <Route path="/Home" render={()=><Home/>}/>
    <Route exact path="/detail/:id" component={Detail}/>
    <Route  path="/Create" render={()=><Form/>}/>
    
    
    
    </div>
  );
}

export default App;