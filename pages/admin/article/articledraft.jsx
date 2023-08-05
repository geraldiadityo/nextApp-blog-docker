import { ListArticle } from "@/components/admin/artikel/ListArticle";
import { PageHeading } from "@/widgets";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { userServices } from "@/services/user.services";


const ArticleDraft = () => {
    const user = useSelector((state) => state.auth?.user);
    const router = useRouter();
    const [articles, setArticles] = useState(null);
    const role = user.role.nama;

    const deleteArticle = async (id) => {
        await userServices.deleteArticle(id)
        .then((res) => {
            Swal.fire({
                title: 'success',
                text: res.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            });
            router.push('/admin/article/articledraft');
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

    const publishArticle = async (id) => {
        await userServices.publishArticle(id)
        .then((res) => {
            Swal.fire({
                title: 'success',
                text: res.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            });
            router.push('/admin/article/articlepublish');
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

    const showNotification = (message, typeAction, id) => {
        return Swal.fire({
            title: 'are you sure?',
            text: message,
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: "yes",
            confirmButtonColor:"#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:'No'
        })
        .then((res) => {
            if (res.isConfirmed){
                if (typeAction === 'delete'){
                    deleteArticle(id);
                } else if (typeAction === 'publish') {
                    publishArticle(id);
                } else {
                    return;
                }
            }
        });
    };
    
    const getDataArticleDraft = async() => {
        await userServices.getArticle(user.id, 'draft')
        .then((res) => {
            setArticles(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getDataArticleDraft();
    },[]);

    
    return (
        <Fragment>
            <PageHeading heading="list Draft Article" />
            <ListArticle articles={articles} showNotification={showNotification} typeList={"draft"} role={role} />
        </Fragment>
    )
};

export default ArticleDraft;
