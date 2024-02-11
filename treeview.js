import { TreeItem } from "@mui/x-tree-view";
import { TreeView } from "@mui/x-tree-view";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Lab from "./lab";

const element = {
  element1: {
    element2: {
      element3: {
        element4: ["basak", "guney"],
      },
      element6: {
        name: "burcak",
      },
    },
  },
  element5: "guney",
};
var blank = "";

const arr = [];
function loopThroughJSON(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        // loop through array

        const a = "/" + key;
        const pos = arr.map((e) => e.path).indexOf(a);
        if (pos == -1) {
          arr.push({
            path: a,
            component1: obj[key].map((item) => {
              return <></>;
            }),

            component2: JSON.stringify(obj[key]),
          });
        }

        for (let i = 0; i < obj[key].length; i++) {
          loopThroughJSON(obj[key][i]);
        }
      } else {
        // call function recursively for object
        const a = "/" + key;
        const pos = arr.map((e) => e.path).indexOf(a);
        if (pos == -1) {
          arr.push({
            path: a,
            component1: Object.keys(obj[key]).map((item) => {
              return (
                <>
                  <a href={"/" + item}>{item + ""}</a> <br></br>
                </>
              );
            }),

            component2: JSON.stringify(obj[key]),
          });
        }
        loopThroughJSON(obj[key]);
      }
    } else {
      // do something with value
      const a = "/" + key;
      const pos = arr.map((e) => e.path).indexOf(a);
      if (pos == -1) {
        arr.push({
          path: a,
          component1: <></>,
          component2: JSON.stringify(obj[key]),
        });
      }
    }
  }
}

// Function component for the TreeView
const MyTreeView = () => {
  loopThroughJSON(element);
  console.log(arr);
  const routeComponents = arr.map(({ path, component1, component2 }, key) => (
    <Route exact path={path} key={key}>
      {component1}
      <br></br>
      <textarea
        class="form-control w-50 p-3"
        id="exampleFormControlTextarea1"
        rows="3"
      >
        {component2}
      </textarea>
    </Route>
  ));
  return (
    <>
      <Router>
        {routeComponents}
        <Route exact path="/">
          {Object.keys(element).map((item) => {
            return (
              <>
                <a href={"/" + item}>{item} </a>
                <br></br>
              </>
            );
          })}{" "}
          <br></br>
          <textarea
            class="form-control w-50 p-3"
            id="exampleFormControlTextarea1"
            rows="3"
          >
            {JSON.stringify(element)}
          </textarea>
        </Route>
      </Router>
    </>
  );
};

export default MyTreeView;
