//  seis copyright 2017-2019
//  SpreadsheetObjectbrowser.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import SpreadsheetCoreRecursive from "./SpreadsheetCoreRecursive";

function eqSet(as, bs) {
  //  via https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

class SpreadsheetObjectbrowser extends Component {
  keyLibrary = new Set();
  lastOne = [];
  constructor() {
    super();
  }

  goBack() {
    window.history.back();
  }

  forEachDb(objArr) {
    console.log("running forEachDb");
    if (typeof objArr === "undefined") {
      objArr = [{}];
    }
    for (let o of objArr) {
      let keyset = Object.keys(o);

      if (keyset !== this.keyLibrary.keys()) {
        for (let z of keyset) {
          this.keyLibrary.add(z);
        }
      }
    }
    return null;
  }

  forEachDbEntry(objArr) {
    for (let o of objArr) {
      let innerSet = new Set(Object.keys(o));
      let innerLibrary = new Set([...this.keyLibrary]);

      if (eqSet(innerSet, innerLibrary)) {
        console.log("matches keyLibrary");
      } else {
        console.log("fails to match keyLibrary");
      }

      let keyset = new Set(Object.keys(o));

      if (keyset !== this.keyLibrary.keys()) {
        for (let z of keyset) {
          this.keyLibrary.add(z);
        }
      }
    }
    return null;
  }

  render(props) {
    let typ = typeof this.props.dbdataArr;
    console.log(this.props.dbdataArr);
    console.log("type: " + typ);

    var g = [{ example: "not found" }];

    if (!this.props.dbdataArr[0]) {
      console.log("dbDataArr prop is undefined");
      g = [{ example: "not found" }];
    } else {
      console.log("dbDataArr prop is not undefined");
      g = JSON.parse(this.props.dbdataArr);
    }

    console.log("type: " + typeof g);
    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="desk-wrapper" className="mlBench-content">
        <SpreadsheetCoreRecursive spreadsheetdata={g} />
        <style>{`
        .spread {
          font-family: "Ubuntu Mono", "Inconsolata", "Hack", "Fira Code", Menlo, monospace;
        }
        span.valSheetRow {
          background-color: lightgray;
          margin-top: 12px;
          margin-right: 10px;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          padding-left: calc(3px + 1vw);
          padding-right: calc(1px + 1vw);
          padding-top: calc(1px + 0.8vw);
          padding-bottom: calc(1px + 0.6vw);
        }
        span.valHeaderRow {
          background-color: lightblue;
          margin-top: 12px;
          margin-right: 10px;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          padding-left: calc(3px + 1vw);
          padding-right: calc(1px + 1vw);
          padding-top: calc(1px + 0.8vw);
          padding-bottom: calc(1px + 0.6vw);
        }
        `}</style>
      </div>
    );
  }
}

export default SpreadsheetObjectbrowser;
