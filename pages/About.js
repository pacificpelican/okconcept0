//  seis copyright 2017-2019
//  About.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import Card from "@material-ui/core/Card";

import Headernav from "./Headernav";
import Footernav from "./Footernav";

import reloadOnce from "./reloadOnce";

class About extends Component {
  state = {
    Ok: true,
    entry: ""
  };

  constructor(props) {
    super();
  }

  goBack() {
    window.history.back();
  }

  render(props) {
    return (
      <div id="editContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>

        <div id="joeypc">
          <span id="animated">
            {'⚅'}
          </span>
        </div>

        <Headernav />

        <h1 id="desk">
          About
          <span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>

        <Card>
          <section id="propsInfo">
            <h3>6️⃣</h3>
            <h3><a href="http://seis.pacificio.com">seis</a></h3>
            <h6>
              an object cycle manager by{" "}
              <a href="http://danmckeown.info">Dan McKeown</a>
            </h6>
            <br />
            <span id="copright">copyright 2019</span>
            <br />
            <br />
            <li>
              You can view objects by entering them into the input at{" "}
              <a href="/Objectbrowser">Objectbrowser</a>
            </li>
            <li>
              After visualizing the object with the `enter your JSON` button you
              can persist the data by pressing the `save to DB` button
            </li>
            <li>
              Database is saved by default to the{" "}
              <a href="../db/seisdb.json">/db/seisdb.json</a> file
            </li>
            <li>
              These saved objects can be viewed at <a href="/Desk">Desk</a>{" "}
              (search for seis as the database object name) in chronological
              order
            </li>
            <li>
              Edit, View and Delete are given the URL parameters they require to
              work via clicks on the links in Desk output
            </li>
            <li>
              Clicking on the red X will take you to the Delete page where you
              can confirm deletion (of that entire object)
            </li>
            <li>
              When an object is created, along with the normal metadata, a
              special locator property is added. This is used as a kind of ID
              for editing and deleting
            </li>
          </section>

          <article id="appTree">
            <h3>App Component Tree</h3>
            <ul>
              <li>
                <a href="./Objectbrowser">Objectbrowser</a> →
                SpreadsheetObjectbrowser → SpreadsheetCoreRecursive
              </li>
              <li>
                <a href="./Desk">Desk</a> → Spreadsheet →
                SpreadsheetCoreRecursiveClick
              </li>
              <li>
                <a href="./View">View</a> → SpreadsheetCoreRecursive
              </li>
            </ul>
            <h3>API</h3>
            <ul id="routes">
              <li>
                GET database object collection:{" "}
                <code>/api/1/getdbdata/db/seisdb/object/seis</code>
                <span className="info">
                  <a href="/Desk">Desk</a>, <a href="/Spiral">Spiralviewer</a>
                </span>
              </li>
              <li>
                GET one database object by locator:{" "}
                <code>/api/1/getdbdata/db/seisdb/object/seis/tuple/14206</code>
                <span className="info">
                  <a href="/View">View</a>
                </span>
              </li>
              <li>
                POST create new database object:{" "}
                <code>
                  /api/1/saveobjectdata/db/seisdb/obj/seis/newdata/%22%20%7B%20%5C%22name%5C%22%3A%20%5C%22Bogey%5C%22%20%7D%22
                </code>
                <span className="info">
                  <a href="/Objectbrowser">Objectbrowser</a>
                </span>
              </li>
              <li>
                POST (shallow) create new database object:{" "}
                <code>
                  /api/1/saveobjectdatashallow/db/spiraldb/obj/notes/newdata/%7B%22note%22%3A%22I%20love%20the%20cat!%22%2C%22savedAt%22%3A1554680275455%7D
                </code>
                <span className="info">
                  <a href="/Spiral">Spiral</a>
                </span>
              </li>
              <li>
                POST update existing database object by locator property:{" "}
                <code>
                  /api/1/updatedata/db/seisdb/object/seis/objprop/Bogey/objkey/name/newval/Belle/tuple/99372
                </code>
                <span className="info">
                  <a href="/Edit">Edit</a>
                </span>
              </li>
              <li>
                POST delete existing database object by locator property:{" "}
                <code>/api/1/deletedata/db/seisdb/object/seis/tuple/15540</code>
                <span className="info">
                  <a href="/Delete">Delete</a>
                </span>
              </li>
            </ul>
          </article>
        </Card>

        <Footernav />

        <footer id="seisFooter">
          <a href="https://pacificio.com">pacificIO</a>
        </footer>

        <style jsx global>{`
          h1#desk,
          aside {
            font-family: Futura, "Ubuntu", "Lucida Grande", "Roboto", Helvetica,
              sans-serif;
          }
          section,
          article {
            font-family: "Courier", "Courier New", serif;
          }
          footer {
            font-family: "Lucida Grande", "Ubuntu", "Roboto", Helvetica, serif;
          }
          footer#deskFooter {
            margin-top: 2em;
            font-family: Ubuntu, Roboto, Helvetica, sans-serif;
          }
          section#user-input {
            margin-bottom: calc(3vh + 10px);
          }
          #lookupDB {
            margin-left: calc(1vh + 10px);
          }
          #results {
            font-family: "Inconsolata", "Anonymous Pro", "Hack", Menlo,
              monospace;
          }
          div#deskContainer {
            background: #f7f8f9;
          }
          section#propsInfo {
            font-family: "Roboto", "Ubuntu Sans", "Segoe UI", "Lucida Sans",
              Helvetica, sans-serif;
          }
          span.info {
            display: block;
          }
          #appTree ul#routes li {
            background: lightgreen;
            margin-block-end: calc(1vh + 10px);
          }
          #appTree ul#routes span {
            margin-block-start: calc(0.5vh + 5px);
            background: lightblue;
          }
          #appTree ul#routes code {
            margin-block-start: calc(0.5vh + 5px);
            display: block;
            background: azure;
          }
          section#propsInfo,
          article#appTree {
            padding-left: calc(2vw + 5px);
          }
          #animated {
            border-radius: 0.45em;
            background: rgb(218, 215, 89);
            background: radial-gradient(
              circle,
              rgba(218, 215, 89, 1) 24%,
              rgba(179, 182, 221, 1) 38%,
              rgba(179, 193, 221, 1) 60%
            );
            width: 711px;
            height: 40px;
            animation-duration: 5s;
            animation-name: slidein;
          }
          @keyframes slidein {
            from {
              margin-left: 100%;
              width: 20px;
              background-color: blue;
            }

            to {
              margin-left: 0%;
              width: 700px;
            }
          }
          div#joeypc {
            font-size: calc(2rem + 2em);
          }
        `}</style>
      </div>
    );
  }
}

export default About;
