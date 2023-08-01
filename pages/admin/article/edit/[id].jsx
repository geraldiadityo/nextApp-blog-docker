import { useState, useEffect } from "react";
import { Spinner } from "@/components/admin/Spinner";
import { AddEdit } from "@/components/admin/artikel/AddEdit";
import { PageHeading } from "@/widgets";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// import post services
import { postServices } from "@/services/post.services";

function Edit(){
    const user = useSelector((state) => state.auth?.user);
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
            <PageHeading heading="Edit Article" />
            {article ? <AddEdit user={user} article={article} /> : <Spinner/>}
        </>
    )
};

export default Edit;
