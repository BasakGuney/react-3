import logo from "./logo.svg";
import "./App.css";
import MyTreeView from "./treeview";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const arr = ["a", "b", "c"];

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route>
            <MyTreeView></MyTreeView>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

/* 


app.post("/", (req, res) => {
  const path = "./" + req.body.ref + ".yaml";
  if (req.body.ref == "") res.send({ response: {} });
  else {
    const respond = yaml.load(fs.readFileSync(path, "utf-8"));

    res.send({ response: respond });
  }
});
*/
