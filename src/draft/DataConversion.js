import React, { useState } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs"; // Preserves styles

import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html"; // Did not convert styles

import { DraftRichEditor } from "./DraftRichEditor";

const DataConversion = () => {
  const [htmlData, setHtmlData] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const editor = React.useRef(null);

  const onHtmlChange = (event) => {
    // setHtmlData({ value: event.target.value });
    let jsonData = convertHtmlToJson(event.target.value);
    setJsonData(JSON.stringify(jsonData, null, 2));
  };

  const convertHtmlToJson = (htmlData) => {
    const blocksFromHTML = convertFromHTML(htmlData);
    // const blocksFromHTML = htmlToDraft(htmlData);

    console.log(
      "convertFromHTML >>",
      JSON.stringify(convertFromHTML(htmlData).contentBlocks, null, 2)
    );
    console.log(
      "htmlToDraft >>",
      JSON.stringify(htmlToDraft(htmlData).contentBlocks, null, 2)
    );
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    // let contentState = stateFromHTML(htmlData);

    const state = EditorState.createWithContent(contentState);
    setEditorState(state);
    editor.current.setEditorState(state);

    console.log("contentState >>>", JSON.stringify(contentState, null, 2));
    const rawContentState = convertToRaw(state.getCurrentContent());
    console.log("draftToHtml >>>", draftToHtml(rawContentState));

    let jsonData = blocksFromHTML.contentBlocks;
    return jsonData;
  };

  return (
    <div className="dataConversion">
      <h4 className="header">HTML Data:</h4>
      <textarea
        name="htmlData"
        id=""
        cols="200"
        rows="5"
        onChange={onHtmlChange}
      ></textarea>
      <h4 className="header">JSON Data:</h4>
      <div className="json_Data text_left box max_height_300">
        <pre>{jsonData}</pre>
      </div>
      <h4 className="header">Draft Preview:</h4>
      <div className="draftPreview box">
        <DraftRichEditor ref={editor} />
      </div>
    </div>
  );
};

export { DataConversion };
