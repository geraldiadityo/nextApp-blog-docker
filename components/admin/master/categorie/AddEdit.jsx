import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Card, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import * as Yup from 'yup';

import { categorieService } from "@/services/master/categorie.services";

function AddEdit(props){
    const categorie = props?.categorie;
    const router = useRouter();
    
    const validationSchema = Yup.object().shape({
        nama: Yup.string().required('this field is required'),
    });

    const formOption = { resolver: yupResolver(validationSchema) };

    let btn_name = 'Add';
    if (categorie){
        formOption.defaultValues = props.categorie;
        btn_name = 'Update';
    }

    const { register, handleSubmit, formState } = useForm(formOption);

    const { errors } = formState;

    function showNotification(title, message, icon){
        Swal.fire({
            title: title,
            text: message,
            icon:icon,
            showConfirmButton: false,
            timer: 3000
        });
    }
    
    async function onSubmit(data){
        try{
            if (categorie){
                await categorieService.edit(categorie.id, data)
                .then((res) => {
                    showNotification("Success", res.message, 'success');
                });
            } else {
                await categorieService.add(data)
                .then((res) => {
                    showNotification("Success", res.message, 'success');
                });
            }

            router.push('/admin/master/categorie');
        } catch (err){
            showNotification('Failed', err, 'error')
        }
    }

    return (
        <Row className="mb-8">
            <Col xl={3} lg={4} md={12} xs={12}>
                <div className="mb-4 mb-lg-0">
                    <h4 className="mb-1">Categorie form</h4>
                    <p className="mb-0 fs-5 text-muted">Add or Edit</p>
                </div>
            </Col>
            <Col xl={9} lg={8} md={12} xs={12}>
                <Card>
                    <Card.Body>
                        <div>
                            <div className="mb-6">
                                <h4 className="mb-1">Categorie information</h4>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <label className="cols-sm-4 col-form-label form-label">Nama Categorie</label>
                                    <div className="col-md-8 col-12">
                                        <input
                                            type="text"
                                            name="nama"
                                            {...register('nama')}
                                            className={`form-control ${errors.nama ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{errors.nama?.message}</div>
                                    </div>
                                    <Col md={{ offset:0, span:8 }} xs={12} className="mt-4">
                                        <button type="submit" className="btn btn-primary">{btn_name}</button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

export { AddEdit };
