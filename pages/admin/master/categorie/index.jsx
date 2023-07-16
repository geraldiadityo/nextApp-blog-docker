import { categorieService } from "@/services/master/categorie.services";
import { Row, Col, Card, Table } from "react-bootstrap";
import { useState ,useEffect, Fragment } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export const getServerSideProps = async ({req, res}) => {
    const data = await categorieService.getall();
    return {
        props:{
            categorieData: data.data
        }
    }
};

const Home = ({ categorieData }) => {
    const [dataCategorie, setDataCategorie] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setDataCategorie(categorieData);
    },[dataCategorie]);

    const showNotification = (id) => {
        Swal.fire({
            title: 'are you sure?',
            text:'delete this item',
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: "yes",
            confirmButtonColor:"#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:'No'
        })
        .then((result) => {
            if (result.isConfirmed){
                deleteItem(id);
            }
        })
    };

    const deleteItem = async(id) => {
        await categorieService.delete(id)
        .then((res) => {
            Swal.fire({
                title: 'Success',
                text: res.message,
                icon:'success',
                showConfirmButton: false,
                timer:3000
            });
            router.push('/admin/master/categorie');
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error',
                text: err,
                showConfirmButton: false,
                icon:'error',
                timer:3000
            });
        });
    };

    return (
        <Fragment>
            <Row className="mt-6">
                <Col lg={12} md={12} xs={12}>
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h3 className="mb-0">Data Categorie</h3>
                            </div>
                            <div>
                                <Link href="/admin/master/categorie/add" className="btn btn-primary">Create New Categorie</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white py-4">
                            <h4 className="mb-0">List Categorie</h4>
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Categorie</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataCategorie && dataCategorie.map((data, index) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{index+1}</td>
                                            <td>{data.nama}</td>
                                            <td>
                                                <Link href={`/admin/master/categorie/edit/${data.id}`} className="btn btn-sm btn-success">Edit</Link>
                                                &nbsp;
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => showNotification(data.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {!dataCategorie && 
                                    <tr>
                                        <td colSpan={3}>waiting....</td>
                                    </tr>
                                }
                                {dataCategorie && !dataCategorie.length && 
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            <div className="p-2">No Data to Display</div>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
};

export default Home;
