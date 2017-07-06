import React from "react";
import {
  CompositeDecorator,
  EditorState,
  Editor,
  Entity,
  convertFromHTML,
  ContentState,
  ContentBlock,
  convertToRaw,
  RichUtils,
  AtomicBlockUtils
} from "draft-js";
import StyleButton from "./StyleButton";
import "./css/editor.css";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const decorator = new CompositeDecorator([
//   {
//     strategy: findImageEntities,
//     component: Image
//   }
// ]);

function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
}

const Image = props => {
  console.log("height", props);
  const { height, src, width } = props.contentState
    .getEntity(props.entityKey)
    .getData();
  return <img src={src} height={height} width={width} />;
};

class AdminEditor extends React.Component {
  constructor(props) {
    super(props);
    this.decorator = new CompositeDecorator([
      {
        strategy: findImageEntities,
        component: Image
      }
    ]);
    const blocksFromHTML = convertFromHTML(props.htmlMarkup);
    const plainState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.state = {
      editorState: EditorState.createWithContent(plainState, this.decorator),
      editorContent: undefined,
      contentState: "",
      touched: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.htmlMarkup !== this.props.htmlMarkup) {
      const content = nextProps.htmlMarkup;
      const blocksFromHTML = convertFromHTML(content);
      const plainState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      this.setState(state => ({
        editorState: EditorState.createWithContent(plainState, this.decorator)
      }));
    }
  }

  onEditorChange = editorContent => {
    this.setState({
      editorContent
    });
  };
  onChange = editorState => this.setState({ editorState });

  logState = () => {
    const content = this.state.editorState.getCurrentContent();
    console.log(convertToRaw(content));
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  addMedia = type => {
    const src = window.prompt("Enter a URL");
    if (!src) {
      return;
    }

    const entityKey = Entity.create(type, "IMMUTABLE", { src });

    const { editorState } = this.state;
    const newState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ""
    );

    console.log(
      convertToRaw(editorState.getCurrentContent()),
      convertToRaw(newState.getCurrentContent()),
      Entity.get(entityKey)
    );

    return newState;
  };

  addImage() {
    this.onChange(this.addMedia("image"));
  }

  handleBlur = () => this.setState({ touched: true });

  // handleChange = event => {
  //   this.props.setEditorState(
  //     this.state.editorState.getCurrentContent().hasText() && this.state.touched
  //   );
  // };

  render() {
    const { editorState } = this.state;
    const { stateOfEditor } = this.props;
    return (
      <div>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className="image-block">
          <button onMouseDown={() => this.addImage()}>
            Add Image
          </button>
        </div>
        <div className="editor">
          <Editor
            tabIndex={0}
            editorState={editorState}
            customStyleMap={styleMap}
            blockRendererFn={mediaBlockRenderer}
            initialContentState={this.props.htmlMarkup}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            placeholder="write text here..."
            spellCheck
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          {!stateOfEditor && this.state.touched
            ? <span className="help-block alert alert-danger">
                This field is required
              </span>
            : ""}
        </div>
      </div>
    );
  }
}

export default AdminEditor;

function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
}

const Media = props => {
  const entity = Entity.get(props.block.getEntityAt(0));

  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "image") {
    media = <ImageUpload src={src} />;
  }

  return media;
};

const ImageUpload = props => {
  return <img src={props.src} />;
};

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one", icon: "header" },
  { label: "H2", style: "header-two", icon: "header" },
  { label: "H3", style: "header-three", icon: "header" },
  { label: "H4", style: "header-four", icon: "header" },
  { label: "Blockquote", style: "blockquote", icon: "quote-right" },
  { label: "UL", style: "unordered-list-item", icon: "list-ul" },
  { label: "OL", style: "ordered-list-item", icon: "list-ol" },
  { label: "Code Block", style: "code-block", icon: "code" }
];

const BlockStyleControls = props => {
  console.log("props", props);
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: "bold" },
  { label: "Italic", style: "ITALIC", icon: "italic" },
  { label: "Underline", style: "UNDERLINE", icon: "underline" },
  { label: "Code Inline", style: "CODE", icon: "code" }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
