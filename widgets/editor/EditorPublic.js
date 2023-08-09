import { Editor, EditorState, convertFromRaw } from "draft-js";

const EditorPublic = (props) => {
    const data = props?.data;
    const content = convertFromRaw(JSON.parse(data));
    const editorState = EditorState.createWithContent(content);

    return (
        <Editor editorState={editorState} readOnly={true} />
    )
}

export default EditorPublic;
