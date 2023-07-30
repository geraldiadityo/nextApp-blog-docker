import { Row, Col, Card  } from "react-bootstrap";
import Image from "next/image";
import draftToHtml from "draftjs-to-html";
import { Editor, EditorState, convertFromRaw } from "draft-js";
const ArticleView = (props) => {
    const article = props?.article;
    // const contentBody = draftToHtml(JSON.parse(article.content));
    const content = convertFromRaw(JSON.parse(article.content));
    const editorState = EditorState.createWithContent(content);
    return (
        <Row className="mt-1">
            <Col lg={12} md={12} xs={12}>
                <h3 className="mb-1">{article.title}</h3>
            </Col>
            <Col lg={12} md={12} xs={12}>
                <Image
                    src={`/upload/content/${article.contentPic}`}
                    width={100}
                    height={100}
                    alt="Content Pic"
                />
            </Col>
            <Col lg={12} md={12} xs={12}>
                <Editor editorState={editorState} readOnly={true} />
            </Col>
        </Row>
    )
};

export { ArticleView };
