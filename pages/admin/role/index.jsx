import { roleService } from "@/services/role.services";
import { Row, Col, Card, Table } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import prisma from "@/lib/prisma";

export const getServerSideProps = async () => {
    const dataRole = await prisma.role.findMany();
    return {
        props:{
            roles: dataRole
        }
    }
};

const Home = ({ roles }) => {
    const [dataRoles, setDataRoles] = useState(null);

    useEffect(() => {
        setDataRoles(roles);
    },[roles]);

    const deleteItem = async(id) => {
        await roleService.delete(id)
        .then((res) => {
            Swal.fire({
                title: 'Success',
                text: res.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            });
        })
        .catch((err) => {
            Swal.fire({
                title: 'Failed',
                text: err,
                icon:'error',
                showConfirmButton: false,
                timer: 3000
            });
        });
    };

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
        });
    };

    return (
        <Fragment>
            <Row className="mt-6">
                <Col lg={12} md={12} xs={12}>
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h3 className="mb-0">Data Role</h3>
                            </div>
                            <div>
                                <Link href="/admin/role/add" className="btn btn-primary">Create New Role</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white py-4">
                            <h4 className="mb-0">Role List</h4>
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Role Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataRoles && dataRoles.map((data, index) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{index+1}</td>
                                            <td>{data.nama}</td>
                                            <td>
                                                <Link href={`/admin/role/edit/${data.id}`} className="btn btn-sm btn-success">Edit</Link>
                                                &nbsp;
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => showNotification(data.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {!dataRoles && 
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            waiting...!
                                        </td>
                                    </tr>
                                }
                                {dataRoles && !dataRoles.length &&
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            No Data to Display
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

