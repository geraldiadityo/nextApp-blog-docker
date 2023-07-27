import { ListArticle } from "@/components/admin/artikel/ListArticle";
import { PageHeading } from "@/widgets";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userServices } from "@/services/user.services";
import Swal from "sweetalert2";

const ArticlePublish = () => {
    const router = useRouter();
    const user = useSelector((state) => state.auth?.user);
    const [dataArticle, setDataArticle] = useState(null);

    const getDataArticle = async () => {
        await userServices.getArticle(user.id, 'publish')
        .then((res) => {
            setDataArticle(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getDataArticle();
    },[]);

    const deleteArticle = async (id) => {
        await userServices.deleteArticle(id)
        .then((res) => {
            Swal.fire({
                title: 'Success',
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

    const showNotification = (message, typeActiom, id) => {
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
                } else {
                    return;
                }
            }
        });
    };

    return (
        <Fragment>
            <PageHeading heading="Article Published" />
            <ListArticle articles={dataArticle} showNotification={showNotification} />
        </Fragment>
    )
};

export default ArticlePublish;
