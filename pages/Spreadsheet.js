//  okconcept0 copyright 2017-2019
//  Spreadsheet.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

import SpreadsheetCoreRecursiveClick from "./SpreadsheetCoreRecursiveClick";

import noTrueArraysMan from "./notruearraysman";

class Spreadsheet extends Component {
  keyLibrary = new Set();
  lastOne = [];

  goBack() {
    window.history.back();
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
