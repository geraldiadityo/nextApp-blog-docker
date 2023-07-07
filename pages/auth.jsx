import {
    Row,
    Col,
    Card,
    Image
} from 'react-bootstrap';
import Link from 'next/link';
import { userServices } from '@/services/user.services';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

// importing layout
import AuthLayout from '@/components/admin/AuthLayout';

const SignIn = () => {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('this field is required'),
        password: Yup.string().required("this field is required"),
    });

    const formOption = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOption);
    const { errors } = formState;
    
    async function onSubmit(data){
        return userServices.login(data)
        .then(() => {
            const returnUrl = router.query.returnUrl || '/admin';
            router.push(returnUrl);
        })
        .catch((err) => {
            Swal.fire({
                title:"unauthorized",
                text: err,
                timer:3000,
                icon: 'error',
                showConfirmButton: false
            });
        })
    }

    function authChecker(){
        if (userServices.userValue){
            router.push('/admin');
        }
    }

    useEffect(() => {
        authChecker();
    },[]);

    return (
        <Row className='align-items-center justify-content-center g-0 min-vh-100'>
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                <Card className="smooth-shadow-md">
                    <Card.Body className='p-6'>
                        <div className='mb-4'>
                            <Link href="/"><Image src='/images/brand/logo/logo-primary.svg' className='mb-2' alt='' /></Link>
                            <p className='mb-6'>Input Data Login</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-group mb-3'>
                                <label htmlFor='username' className='form-label'>Username </label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    {...register("username")}
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    placeholder='username'
                                />
                                <div className='invalid-feedback'>{errors.username?.message}</div>
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    {...register("password")}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder='password'
                                />
                                <div className='invalid-feedback'>{errors.password?.message}</div>
                            </div>
                            <div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

SignIn.Layout = AuthLayout;

export default SignIn;
