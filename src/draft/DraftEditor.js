import React from "react";
import { Editor, EditorState } from "draft-js";
import FontSizeSelector from "./FontSizeSelector";
import "draft-js/dist/Draft.css";

function DraftEditor() {
  const toolbarSettings = {
    options: [
      "inline",
      "list",
      "link",
      "fontSize",
      "colorPicker",
      "history",
      "remove",
    ],
    inline: {
      options: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
      ],
      bold: { icon: "", className: "cdkicon cdkicon-format_bold" },
      italic: { icon: "", className: "cdkicon cdkicon-format_italic" },
      underline: { icon: "", className: "cdkicon cdkicon-format_underlined" },
      strikethrough: {
        icon: "",
        className: "cdkicon cdkicon-format_strikethrough",
      },
      superscript: { icon: "", className: "cdkicon cdkicon-super_script" },
      subscript: { icon: "", className: "cdkicon cdkicon-sub_script" },
    },
    list: {
      options: ["unordered", "ordered"],
      unordered: {
        icon: "",
        className: "cdkicon cdkicon-format_list_bulleted",
      },
      ordered: { icon: "", className: "cdkicon cdkicon-format_list_numbered" },
    },
    link: {
      options: ["link"],
      link: { icon: "", className: "cdkicon cdkicon-link" },
    },
    fontSize: {
      icon: "",
      options: ["Normal", "Small", "Medium", "Large", "X-Large"],
      className: "cdk-icon cdkicon-format_size",
      dropdownClassName: "",
      component: FontSizeSelector,
    },
    colorPicker: { icon: "", className: "cdkicon cdkicon-format_color_text" },
    history: {
      options: ["undo", "redo"],
      undo: { icon: "", className: "cdkicon cdkicon-undo" },
      redo: { icon: "", className: "cdkicon cdkicon-redo" },
    },
    remove: { icon: "", className: "cdkicon cdkicon-format_clear" },
  };

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write something!"
        toolbarMmj={toolbarSettings}
      />
    </div>
  );
}

export { DraftEditor };
