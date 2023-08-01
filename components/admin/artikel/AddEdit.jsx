import dynamic from "next/dynamic";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Select from 'react-select';
import { userServices } from "@/services/user.services";
import { categorieService } from "@/services/master/categorie.services";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {ssr: false});


const AddEdit = (props) => {
    const router = useRouter();
    const user = props?.user;
    const article = props?.article;
    const [dataCategorie, setDataCategorie] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(EditorState.createEmpty());
    const [gambar, setGambar] = useState(null);
    const [categorie, setCategorie] = useState("");

    const handleFileUpload = (event) => {
        setGambar(event.target.files[0]);
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e);
    };

    const handleCategorie = (e) => {
        setCategorie(e);
    };

    const getDataCategorie = async() => {
        await categorieService.getall()
        .then((res) => {
            const result = res.data.map(data => {
                return {
                    label: data.nama,
                    value: data.nama
                }
            });
            setDataCategorie(result);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (props.article){
            setTitle(article.title);
            setCategorie(article.categorie.nama);
            setContent(EditorState.createWithContent(convertFromRaw(JSON.parse(article.content))));
        }
        getDataCategorie();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valueContent = content.getCurrentContent();
        const rawContentState = convertToRaw(valueContent);



        try{
            // const data = {
            //     title: title,
            //     content: JSON.stringify(rawContentState),
            //     gambar: gambar,
            //     categorie: categorie,
            // };

            // console.log(data.categorie);
            
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content",JSON.stringify(rawContentState));
            formData.append("gambar", gambar);
            formData.append("categorie", categorie);
            
            if (article){
                await userServices.updateArticle(article.id, formData)
                .then((res) => {
                    Swal.fire({
                        title: 'Success',
                        text: res.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                });
            } else {
                await userServices.createArticle(user.id, formData)
                .then((res) => {
                    Swal.fire({
                        title:'Success',
                        text: res.message,
                        icon:'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                
                });
            }
            router.push("/admin/article/articledraft");
        } catch (err){
            Swal.fire({
                title: "Failed",
                text: err,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            });
        }
    };

    return (
        <Row className="mb-8">
            <Col xl={3} lg={4} md={12} xs={12}>
                <div className="mb-4 mb-lg-0">
                    <h4 className="mb-1">Article information</h4>
                    <p className="mb-0 fs-5 text-muted">Create Or Edited Article</p>
                </div>
            </Col>
            <Col xl={9} lg={8} md={12} xs={12}>
                <Card>
                    <Card.Body>
                        <div>
                            <div className="mb-6">
                                <h4 className="mb-1">Content Article</h4>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Title</label>
                                <div className="col-md-8 col-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={handleTitle}
                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Content</label>
                                <div className="col-md-8 col-12">
                                    <Editor
                                        editorState={content}
                                        onEditorStateChange={handleContent}
                                        editorClassName="editor-class"
                                        wrapperClassName="wrapper-class"
                                        toolbarClassName="toolbar-class"
                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Image Content {article ? ' (leave if not change)' : ''}</label>
                                <div className="col-md-8 col-12">
                                    <input
                                        type="file"
                                        name="gambar"
                                        onChange={handleFileUpload}
                                        className="form-control"
                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Categorie</label>
                                <div className="col-md-8 col-12">
                                    <Select
                                        options={dataCategorie}
                                        placeholder={"Pilih Kategori"}
                                        onChange={(e) => handleCategorie(e.value)}
                                        value={dataCategorie.filter((option) => option.label === categorie)}
                                    />
                                </div>
                                <Col md={{ offset:0, span:8 }} xs={12} className="mt-4">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

export { AddEdit };
