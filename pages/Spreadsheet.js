//  seis copyright 2017-2019
//  Spreadsheet.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import SpreadsheetCoreRecursiveClick from "./SpreadsheetCoreRecursiveClick";

function noTrueArraysMan(objArr) {
  let returnArr = [];
  for (let i = 0; i < objArr.length; i++) {
    returnArr.push(objArr[i]);
  }
  return returnArr;
}

function eqSet(as, bs) {
  //  via https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

class Spreadsheet extends Component {
  keyLibrary = new Set();
  lastOne = [];

  goBack() {
    window.history.back();
  }

  forEachDb(objArr) {
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
    let retArr = [];

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
    console.log("table prop in Spreadsheet: " + this.props.table);
    let g = noTrueArraysMan(this.props.dbdataArr);

    const theStore = this.props.store;
    const theTable = this.props.table;

    console.log("keyLibrary: " + this.keyLibrary);

    return (
      <div id="desk-wrapper" className="mlBench-content">
        <SpreadsheetCoreRecursiveClick
          spreadsheetdata={g}
          store={theStore}
          table={theTable}
        />
        <style>{`
        
        `}</style>
      </div>
    );
  }
}

export default Spreadsheet;
