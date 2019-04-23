//  seis copyright 2017-2019
//  Spiral.js
//  via apple-picker, mlBench, and danmckeown.info #5
import React, { Component } from "react";
import Headernav from "./Headernav";

export default class Spiral extends Component {
  state = {
    note: 'default'
  }
  updateNote = (event) => {
    let capturedVal = event.target.value;
    this.setState({ note: capturedVal });
  }
  requestSaveNote = (event) => {
    this.saveNoteToDB(this.state.note);
  }
  saveNoteToDB(note) {
    let noteObj = Object.assign({}, {note: note, savedAt: Date.now()});
    this.saveObjectToDatabase(noteObj);
  }
  saveObjectToDatabase = (
    newdata = "{data: 'none', savedAt: 'null'}",
    objectTo = "notes",
    db = "spiraldb"
  ) => {
    console.log("new data to be written");
    console.log(newdata);

    let newdataString = encodeURIComponent(JSON.stringify(newdata));

    console.log(newdataString);

    let dest =
      "/api/1/saveobjectdatashallow/db/" +
      db +
      "/obj/" +
      objectTo +
      "/newdata/" +
      newdataString;

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
  render() {
    return(
      <React.Fragment>
        <div id="spiralContainer">

          <header id="spiral-header">
              <h1 id="spiral-header--heading">
                🌀 Notes 
              </h1>
            </header>

          <main id="spiral-main">
            <textarea id="spiral-main--input" onChange={this.updateNote}>
            </textarea>
            <button id="spiral-main--button" onClick={this.requestSaveNote}>
              save note
            </button>
          </main>
        
          <footer id="spiralFooter">
            <br />
            <a href="https://pacificio.com">from pacificIO</a>
            <br />
          </footer>

          <Headernav />

        </div>
       
        <style jsx>{`
          header, footer, footer a {
            font-family: "Hack", "Fira Code", "Inconsolata", "Anonymous Pro", Menlo, monospace;
            color: black;
          }
          main#spiral-main {
            display: flex;
            flex-direction: column;
          }
          div#spiralContainer {
            background: yellow;
          }
          textarea#spiral-main--input {
            background: lightgreen;
            width: calc(88vw + 5px);
            height: calc(75vh + 10px);
            font-family: "Ubuntu Mono", "Fira Code", "Anonymous Pro", monospace;
            font-size: calc(2rem);
            line-height: 1.3;
          }
          button#spiral-main--button {
            background: white;
            height: calc(20px + 3vh);
            width: calc(40vw + 40px);
          }
        `}</style>
      </React.Fragment>
    )
  }
}
