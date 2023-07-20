import { userServices } from "@/services/user.services";
import { Row, Col, Card, Table } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";

export const getServerSideProps = async () => {
    const users = await userServices.getAllUser()
    return {
        props: {
            dataUser: users.data
        }
    }
};

const Home = ({ dataUser }) => {
    const [users, setUsers] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setUsers(dataUser);
    },[dataUser]);

    const deleteUser = async (id) => {
        await userServices.deleteUser(id)
        .then((res) => {
            Swal.fire({
                title: 'Success',
                text: res.message,
                icon:'success',
                showConfirmButton: false,
                timer: 3000
            });
            router.push('/admin/users');
        })
        .catch((err) => {
            Swal.fire({
                title: 'Failed',
                text: err,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            });
        });
    };

    const showNotification = (id) => {
        Swal.fire({
            title: 'are you sure?',
            text:'delete this User',
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: "yes",
            confirmButtonColor:"#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:'No'
        })
        .then((res) => {
            if (res.isConfirmed){
                deleteUser(id);
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
                                <h3 className="mb-0">Data All User</h3>
                            </div>
                            <div>
                                <Link href="/admin/users/add" className="btn btn-primary">Create New User</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white py-4">
                            <h4 className="mb-0">User List</h4>
                        </Card.Header>
                        <Table responsive className="text-text-nowrap mb-0">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>username</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataUser && dataUser.map((data, index) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{index+1}</td>
                                            <td>{data.firstName} {data.lastName}</td>
                                            <td>{data.username}</td>
                                            <td>{data.status === true ? 'Activated' : 'Not Activated'}</td>
                                            <td>{data.role.nama}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => showNotification(data.id)}>DELETE</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {!dataUser &&
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            waiting....
                                        </td>
                                    </tr>
                                }
                                {dataUser && !dataUser.length &&
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            No Data Display!
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
