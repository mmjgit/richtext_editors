import "./App.css";
import "react-quill/dist/quill.snow.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { DraftEditor } from "./draft/DraftEditor";
import { EntityEditorExample } from "./draft/EntityEditor";
import { DraftRichEditor } from "./draft/DraftRichEditor";
import { DataConversion } from "./draft/DataConversion";
import { ColorfulEditorExample } from "./draft/ColorfulEditorExample";

import { QuillEditor, quillStylesStr } from "./quill/QuillEditor";

import QuillIFrame from "./quill/QuillIFrame";

function App() {
  return (
    <div className="App">
      <nav className="">
        <ul className="nav nav-tabs nav-fill">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Data Conversion
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/draftJs" className="nav-link">
              Draft JS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quillJs" className="nav-link">
              Quill JS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/iFrameQuillJs" className="nav-link">
              iFrame Quill JS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/draftColor" className="nav-link">
              ColorfulEditorExample Draft JS
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact={true} path="/">
          <header className="App-header">
            <p>Data Conversion:</p>
          </header>
          <div className="box">
            <DataConversion />
          </div>
        </Route>

        <Route path="/draftJs">
          <header className="App-header">
            <p>Draft JS:</p>
          </header>
          {/* <div className="box">
        <DraftEditor />
      </div> */}
          <p>RichEditor:</p>
          <div className="box">
            <DraftRichEditor />
          </div>
        </Route>

        <Route path="/quillJs">
          <header className="App-header">
            <p>Quill JS:</p>
          </header>
          <div className="box">
            <QuillEditor />
          </div>
        </Route>

        <Route path="/iFrameQuillJs">
          <QuillIFrame />
        </Route>

        <Route path="/draftColor">
          <header className="App-header">
            <p>ColorfulEditorExample Draft JS:</p>
          </header>
          <div className="box">
            <ColorfulEditorExample />
          </div>
          <div className="box">
            <ColorfulEditorExample />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
