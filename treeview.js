import { TreeItem } from "@mui/x-tree-view";
import { TreeView } from "@mui/x-tree-view";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

// Function component for the TreeView
const MyTreeView = () => {
  const [obj, setObj] = useState({});
  const k = window.location.href.split("/");
  axios.post("/", { ref: k[3] }).then((res) => {
    setObj(res.data.response);
  });

  const renderTree = (nodes) => {
    return (
      <>
        <TreeItem
          key={nodes + ""}
          nodeId={nodes + ""}
          label={<a href={"/" + nodes[0]}>{nodes[0] + ""}</a>}
        >
          <textarea
            class="form-control w-50 p-3"
            id="exampleFormControlTextarea1"
            rows="3"
          >
            {JSON.stringify(nodes[1])}
          </textarea>
          <br></br>

          {typeof nodes[1] === "object"
            ? Array.isArray(nodes[1])
              ? nodes[1].map((node) =>
                  typeof node == "object"
                    ? Object.entries(node).map((item) => renderTree(item))
                    : null
                )
              : Object.entries(nodes[1]).map((node) => renderTree(node))
            : null}
        </TreeItem>
      </>
    );
  };

  return (
    <>
      {Array(1)
        .fill()
        .map(() => {
          return (
            <>
              <TreeView>
                {Object.entries(obj).map((node) => renderTree(node))}
              </TreeView>
            </>
          );
        })}
    </>
  );
};

export default MyTreeView;

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
