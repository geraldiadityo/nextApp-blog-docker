import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { postServices } from "@/services/post.services";

import PublicLayout from "@/components/publik/PublicLayout";
import { DetailArticle } from "@/components/publik/DetailArticle";
import { Spinner } from "@/components/admin/Spinner";
const Detail = () => {
    const router = useRouter();
    const [article, setArticle] = useState(null);
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        postServices.getOnePost(id)
        .then((res) => setArticle(res.data))
        .catch((err) => console.log(err));
    },[router]);
    return (
        <>
            {article ? <DetailArticle data={article} /> : <Spinner />}
        </>
    )
}

Detail.Layout = PublicLayout;
export default Detail;
