import React from "react";
import Draft from "draft-js";
import "draft-js/dist/Draft.css";
import "./DraftRichEditor.css";
import { stateToHTML } from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";

const {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} = Draft;

class DraftRichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();

    // With "html-to-draftjs" (Rendering raw HTML)
    // const blocksFromHtml = htmlToDraft("<b>bold <i>b&amp;i</i></b>");
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const editorState = EditorState.createWithContent(contentState);

    // With convertFromHTML (Rendering raw HTML)
    // const sampleMarkup = "<b>bold <i>b&amp;i</i></b>";
    // const blocksFromHTML = convertFromHTML(sampleMarkup);
    // const contentState = ContentState.createFromBlockArray(
    //     blocksFromHTML.contentBlocks,
    //     blocksFromHTML.entityMap,
    // );
    // const editorState = EditorState.createWithContent(contentState);

    // With JSON
    const blocksJson = {
      entityMap: {},
      blocks: [
        {
          key: "637gr",
          text: "bold b&i MMJ",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 12,
              style: "BOLD",
            },
            {
              offset: 5,
              length: 7,
              style: "ITALIC",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
    };
    const contentState = convertFromRaw(blocksJson);
    const editorState = EditorState.createWithContent(contentState);

    // this.state = { editorState: EditorState.createEmpty(), editorHtml: "" };
    this.state = { editorState, editorHtml: "" };

    this.focus = () => this.editorRef.current.focus();
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        editorHtml: stateToHTML(editorState.getCurrentContent()),
      });
      console.log(
        "Draft Blocks JSON >>>> ",
        convertToRaw(editorState.getCurrentContent())
      );
      console.log(
        "Draft HTML >>>> ",
        stateToHTML(editorState.getCurrentContent())
      );
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  setEditorState(state) {
    this.onChange(state);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="..."
              ref={this.editorRef}
              spellCheck={true}
            />
          </div>
        </div>
        <div className="box">
          <p>{this.state.editorHtml}</p>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  red: {
    color: "rgba(255, 0, 0, 1.0)",
  },
  orange: {
    color: "rgba(255, 127, 0, 1.0)",
  },
  yellow: {
    color: "rgba(180, 180, 0, 1.0)",
  },
  green: {
    color: "rgba(0, 180, 0, 1.0)",
  },
  blue: {
    color: "rgba(0, 0, 255, 1.0)",
  },
  indigo: {
    color: "rgba(75, 0, 130, 1.0)",
  },
  violet: {
    color: "rgba(127, 0, 255, 1.0)",
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export { DraftRichEditor };
