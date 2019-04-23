import React from "react";
import Link from "next/link";

import Headernav from "./Headernav";

function goBack() {
  window.history.back();
}

export default () => (
  <section id="homeContainer">
    <button id="backButton" href="#" onClick={goBack}>
      ⬅️ back
    </button>
    <Headernav />
    <h2 id="six">{'⚅'}6️⃣ SEIS</h2>
    <h4>Components</h4>
    <ul id="seis">
      <li>
        <Link href="/Objectbrowser">
          <a>Objectbrowser (Create)</a>
        </Link>
      </li>
      <li>
        <Link href="/Desk">
          <a>Desk (Read)</a>
        </Link>
      </li>
      <li>
        <Link href="/View">
          <a>View (Read 1)</a>
        </Link>
      </li>
      <li>
        <Link href="/Edit">
          <a>Edit (Update)</a>
        </Link>
      </li>
      <li>
        <Link href="/Delete">
          <a>Delete (Destroy)</a>
        </Link>
      </li>
    </ul>
    <br />
    <h4>Apps</h4>
    <ul id="apps">
      <li>
        <Link href="/Spiral">
          <a>Spiral (Create Notes)</a>
        </Link>
      </li>
      <li>
        <Link href="/Spiralviewer">
          <a>Spiralviewer (Read Notes)</a>
        </Link>
      </li>
    </ul>
    <ul>
      <li>
        <Link href="/About">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href={{ pathname: "/posts", query: { id: "2" } }} as="/posts/2">
          <a>post #2</a>
        </Link>
      </li>
    </ul>
    <footer id="seisFooter">
      <a href="https://pacificio.com">pacificIO</a>
    </footer>
    <style jsx>{`
      ul#seis,
      ul#apps {
        display: flex;
      }
      ul#seis li {
        width: calc(30px + 20vw);
        background: yellow;
        margin-right: calc(1vw + 2px);
      }
      ul#apps li {
        width: calc(30px + 20vw);
        background: lightgreen;
        margin-right: calc(1vw + 2px);
      }
      .spread,
      section#homeContainer,
      section#homeContainer a {
        font-family: "Ubuntu Mono", "Inconsolata", "Hack", "Fira Code", Menlo,
          monospace;
        color: black;
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
      h2#six {
        margin-left: calc(3px + 2vw);
        font-size: calc(3rem);
      }
    `}</style>
  </section>
);
