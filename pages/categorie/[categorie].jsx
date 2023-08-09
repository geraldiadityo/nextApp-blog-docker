import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CardPublik, CategoriePublic } from "@/widgets";
import { postServices } from "@/services/post.services";

import PublicLayout from "@/components/publik/PublicLayout";
const Categories = () => {
    const router = useRouter();
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const { categorie } = router.query;
        if (!categorie) return;

        postServices.getAllByCategorie(categorie)
        .then((res) => setArticles(res.data))
        .catch((err) => console.log(err));
    },[router]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {articles && articles.map((data, index) => {
                                    return (
                                        <div className="col-lg-6" key={index}>
                                            <CardPublik data={data} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <CategoriePublic />
                </div>
            </div>
        </div>
    )
}

Categories.Layout = PublicLayout;
export default Categories;