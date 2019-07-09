//  seis copyright 2017-2019
//  SpreadsheetCoreRecursive.js
//  via mlBench & danmckeown.info
import React, { Component } from "react";

class SpreadsheetCoreRecursive extends Component {
  constructor() {
    super();
  }

  render(props) {
    var g;
    if (this.props.spreadsheetdata[0] !== undefined) {
      g = [{}, ...this.props.spreadsheetdata];
    } else {
      g = [this.props.spreadsheetdata];
    }

    return (
      <div id="desk" className="mlBench-content">
        <section id="keylibrary">
          {g.map(function(interVal) {
            let valArr = Object.keys(interVal);
            let retSet = [];

            for (let i = 0; i < valArr.length; i++) {
              if (typeof valArr[i] === "object") {
                //         do nothing
              } else {
                retSet.push(
                  <span key={valArr[i]} className="valHeaderRow">
                    {valArr[i] + " "}
                  </span>
                );
              }
            }
          })}
        </section>
        <section id="datalibrary">
          {g.map(function(interVal) {
            let keyArr = Object.keys(interVal);
            let valArr = Object.values(interVal);

            let retSet = [];

            for (let i = 0; i < keyArr.length; i++) {
              if (typeof keyArr[i] === "object") {
              } else {
                retSet.push(
                  <span key={keyArr[i]} className="valHeaderRow">
                    {keyArr[i] + " "}
                  </span>
                );
              }
              if (i === keyArr.length - 1) {
                retSet.push(<div key={i+keyArr[i]+valArr[i]+`headerDivider`} className="endDividerHead" />);
              }
            }

            for (let i = 0; i < valArr.length; i++) {
              if (typeof valArr[i] === "object") {
                retSet.push(
                  <span key={valArr[i]} className="valSheetRow">
                    <SpreadsheetCoreRecursive spreadsheetdata={valArr[i]} />
                  </span>
                );
              } else {
                retSet.push(
                  <span key={valArr[i]} className="valSheetRow">
                    {valArr[i] + " "}
                  </span>
                );
              }
              if (i === keyArr.length - 1) {
                retSet.push(<div key={i+keyArr[i]+valArr[i]+`valDivider`} className="endDivider" />);
              }
            }

            return [...retSet];
          })}
        </section>
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
            font-family: "Lato", "Roboto", "Segoe UI", Helvetica, sans-serif; 
          }
          span.valHeaderRow {
            background-color: lightblue;
            margin-top: 12px;
            margin-right: 10px;
            margin-bottom: 0.6rem;
            line-height: 1.3;
            font-family: "Lato", "Roboto", "Segoe UI", Helvetica, sans-serif;
          }
        `}</style>
      </div>
    );
  }
}

export default SpreadsheetCoreRecursive;
