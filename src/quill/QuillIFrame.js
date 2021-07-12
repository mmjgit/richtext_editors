import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { QuillEditor, quillStylesStr } from "./QuillEditor";

const QuilliFrameComponent = () => {
  let frameStyles = document.createElement("style");
  frameStyles.innerText = quillStylesStr;
  // let portalDiv = document.createElement('div');
  // portalDiv.id = 'portalDiv';
  // document.getElementById('myFrame').contentDocument.body.appendChild(portalDiv);

  useEffect(() => {
    document
      .getElementById("myFrame")
      .contentDocument.body.appendChild(frameStyles);
    // console.log("portalDiv >>>", portalDiv);
    // ReactDOM.createPortal(
    //   <div>MMJ</div>,
    //   portalDiv
    // );
  }, []);

  return (
    <div>
      <header className="App-header">
        <p>iFrame Quill JS:</p>
      </header>
      <div className="box">
        <FramePortal>
          <div>
            <QuillEditor />
          </div>
        </FramePortal>
      </div>
    </div>
  );
};

class FramePortal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement("div");
  }

  render() {
    return (
      <iframe
        id="myFrame"
        title="iframe"
        width="100%"
        ref={(el) => (this.iframe = el)}
      >
        {ReactDOM.createPortal(this.props.children, this.containerEl)}
      </iframe>
    );
  }

  componentDidMount() {
    this.iframe.contentDocument.body.appendChild(this.containerEl);
  }
}

export default QuilliFrameComponent;
