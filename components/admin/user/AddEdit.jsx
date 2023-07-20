import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card } from "react-bootstrap";
import Select from 'react-select';
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as Yup from 'yup';

// import user service
import { userServices } from "@/services/user.services";
import { roleService } from "@/services/role.services";
function AddEdit(props){
    const router = useRouter();
    const [dataRole, setDatarole] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('this field is required'),
        lastName: Yup.string(),
        username: Yup.string().required('this field is required'),
        password: Yup.string().required('this field is required').min(6,"at least 6 character"),
        role: Yup.string().required('this field is required')
    });

    const formOption = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setValue, control, formState } = useForm(formOption);
    const { errors } = formState;

    const getDataRoles = async() => {
        await roleService.getall()
        .then((res) => {
            const result = res.data.map(data => {
                return {
                    label: data.nama,
                    value: data.nama
                }
            });
            setDatarole(result);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        getDataRoles();
    },[]);

    const handleChangeFirstName = (value) => {
        setFirstName(value);
        setValue("firstName",value);
    };

    const handleChangeLastName = (value) => {
        setLastName(value);
        setValue("lastName", value);
    };

    const handleChangeUsername = (value) => {
        setUsername(value);
        setValue("username", value);
    };

    const handleChangePassword = (value) => {
        setPassword(value);
        setValue("password", value);
    };

    const handleChangeRole = (value) => {
        setRole(value);
        setValue("role", value);
    };
    
    const onSubmit = async (data) => {
        try {
            await userServices.addUser(data)
            .then((res) => {
                Swal.fire({
                    title: 'Success',
                    text: res.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });
                router.push('/admin/users');
            });
        } catch(err){
            Swal.fire({
                title: 'Failed',
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
                    <h4 className="mb-1">Data User</h4>
                    <p className="mb-0 fs-5 text-muted">Create New User</p>
                </div>
            </Col>
            <Col xl={9} lg={8} md={12} xs={12}>
                <Card>
                    <Card.Body>
                        <div>
                            <div className="mb-6">
                                <h4 className="mb-1">User Information</h4>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">First Name</label>
                                <div className="col-md-8 col-12">
                                    <Controller
                                        control={control}
                                        name="firstName"
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                    value={firstName}
                                                    onChange={(e) => handleChangeFirstName(e.target.value)}
                                                />
                                            )
                                        }}
                                    />
                                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Last Name</label>
                                <div className="col-md-8 col-12">
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        render={({field: {value, onChange} }) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                    value={lastName}
                                                    onChange={(e) => handleChangeLastName(e.target.value)}
                                                />
                                            )
                                        }}
                                    />
                                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Username</label>
                                <div className="col-md-8 col-12">
                                    <Controller
                                        name="username"
                                        control={control}
                                        render={({field: {value, onChange} }) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangeUsername(e.target.value)}
                                                    value={username}
                                                />
                                            )
                                        }}
                                    />
                                    <div className="invalid-feedback">{errors.username?.message}</div>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Password</label>
                                <div className="col-md-8 col-12">
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({field: {value, onChange} }) => {
                                            return (
                                                <input
                                                    type="password"
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangePassword(e.target.value)}
                                                    value={password}
                                                />
                                            )
                                        }}
                                    />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-sm-4 col-form-label form-label">Role</label>
                                <div className="col-md-8 col-12">
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({field: {value, onChange} }) => {
                                            return (
                                                <Select
                                                    options={dataRole}
                                                    placeholder={"Select Role"}
                                                    onChange={(e) => handleChangeRole(e.value)}
                                                    value={dataRole.filter((option) => option.label === role)}
                                                />
                                            )
                                        }}
                                    />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                                <Col md={{ offset:0, span:8 }} xs={12} className="mt-4">
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}

export { AddEdit };
