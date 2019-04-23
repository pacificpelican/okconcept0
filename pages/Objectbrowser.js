//  seis copyright 2017-2019
//  Objectbrowser.js
//  via apple-picker, mlBench, and danmckeown.info #5
import React, { Component } from "react";
import { TextInput, Button, Pane } from "evergreen-ui";
import SpreadsheetObjectbrowser from "./SpreadsheetObjectbrowser";
import Headernav from "./Headernav";
import Errorboundary from "./Errorboundary";

import reloadOnce from "./reloadOnce";

class Objectbrowser extends Component {
  state = {
    userObjectAsk: "seis",
    dbdata: "-",
    dbdataArr: [],
    dbdataArrState: [],
    indexURL: "",
    lastHeader: [],
    dbName: "seisdb"
  };
  keyLibrary = new Set();
  lastOne = [];
  constructor() {
    super();

    this.handlecValueChange = this.handlecValueChange.bind(this);
    this.handleLookupButton = this.handleLookupButton.bind(this);
  }

  goBack() {
    window.history.back();
  }

  requestSaveToDatabase = () => {
    let filteredObject;

    filteredObject = this.state.dbdataArr;
    console.log(filteredObject.toString());
    this.saveObjectToDatabase(this.state.userObjectAsk, filteredObject, this.state.dbName);
  };

  saveObjectToDatabase = (
    objectTo = "seis",
    newdata = "{data: 'none'}",
    db = "seisdb"
  ) => {
    console.log("new data to be written");
    console.log(newdata);

    let newdataString = encodeURIComponent(JSON.stringify(newdata));

    console.log(newdataString);

    let dest =
      "/api/1/saveobjectdata/db/" +
      db +
      "/obj/" +
      objectTo +
      "/newdata/" +
      newdataString.toString();

    console.log("fetch save request: " + dest);
    fetch(dest, { method: "post" })
      .then(function (response) {
        if (response.ok) {
          console.log("response ok");

          return response.json();
        } else {
          throw new Error(response.Error);
        }
      })
      .then(function (myReturn) {
        console.log(myReturn);
      });
  };

  handlecValueChange(event) {
    let capturedVal = event.target.value;
    this.setState({ dbdataArr: capturedVal });
  }

  handleLookupButton(event) {
    let capturedVal = this.state.dbdataArr;
    this.setState({ dbdataArrState: capturedVal });
  }

  handleDBNameChange = (event) => {
    let capturedVal = event.target.value;
    this.setState({ dbName: capturedVal });
  }

  pickSeis = () => {
    this.setState({ userObjectAsk: "seis"});
  }

  handleTABLEValueChange = (event) => {
    let capturedVal = event.target.value;
    this.setState({ userObjectAsk: capturedVal });
  }

  componentDidMount(props) {  //  Auto-fill the input fields if props are provided to Objectbrowser
    console.log("running componentDidMount");
    if (this.props.dataArray) {
      let newObj = this.props.dataArray;
      this.setState({ dbdataArr: newObj });
      console.log("setting initial data");
    }
    if (this.props.dataTable) {
      let newObj = this.props.dataTable;
      this.setState({ userObjectAsk: newObj });
    }
    if (this.props.dataBase) {
      let newObj = this.props.dataBase;
      this.setState({ dbName: newObj });
    }
  }

  render() {
    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="deskContainer" className="mlBench-content-wrappers">
        <button id="backButton" href="#" onClick={this.goBack}>
          ⬅️ back
        </button>
        <Headernav />
        <h1 id="desk">
          mlBench Objectbrowser
          <span id="rollLink">
            {" "}
            <a href="#" onClick={reloadOnce}>
              reload()
            </a>
          </span>
        </h1>
        <section id="user-input">
          <span id="database">database: </span>
          <input
            type="string"
            id="obj_input_db"
            onChange={this.handleDBNameChange}
            value={this.state.dbName}
          />
          <br />
          <span id="database">table: </span>
          <input
            id="db_table"
            onChange={this.handleTABLEValueChange}
            value={this.state.userObjectAsk}
          />
          <br />
          <TextInput
            type="object"
            id="obj_input"
            onChange={this.handlecValueChange}
            value={this.state.dbdataArr}
          />
          <br />
          <Button onClick={this.handleLookupButton} id="lookupDB">
            enter your JSON
          </Button>
        </section>
        <aside id="dbRequest">
          <Button id="btn-save" onClick={this.requestSaveToDatabase}>
            Save to DB
          </Button>
        </aside>
        <div id="objectCopy" className="dataReadout">
          <Pane>
            <details>
              <summary>object</summary>
              <p>{this.state.dbdataArrState}</p>
            </details>
          </Pane>
        </div>
        <Errorboundary>
          <SpreadsheetObjectbrowser dbdataArr={this.state.dbdataArrState} />
        </Errorboundary>
        <style jsx global>{`
          h1#desk {
            font-family: Futura, "Ubuntu", "Lucida Grande", "Roboto", Helvetica,
              sans-serif;
          }
          div#desk-wrapper.mlBench-content div#desk {
            width: 80vw;
            display: grid;
            grid-auto-columns: 75vw;
            grid-gap: 10px;
            grid-auto-rows: auto;
            background: azure;
          }
          section#datalibrary {
            display: flex;
            flex-flow: wrap;
            align-items: center;
          }
          span#database {
            font-family: Courier, sans-serif;
          }
          i.notColor {
            background: azure;
          }
          section#user-input, aside#dbRequest, Input {
            margin-top: calc(5px + 0.4vh);
            margin-bottom: calc(7px + 0.4vh);
          }
          input#obj_input_db, input#db_table {
            height: calc(1rem + 10px);
          }
        `}</style>
      </div>
    );
  }
}

export default Objectbrowser;
