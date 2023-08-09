import { CardPublik, CategoriePublic } from "@/widgets";
import PublicLayout from "@/components/publik/PublicLayout";
import { postServices } from "@/services/post.services";

export const getServerSideProps = async() => {
    const dataArticle = await postServices.getAllPost();
    
    return {
        props: {
            dataArticle: dataArticle.data
        }
    }
};

const Article = ({ dataArticle }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {dataArticle && dataArticle.map((data, index) => {
                                    return (
                                        <div className="col-lg-6" key={index}>
                                            <CardPublik data={data} />
                                        </div>
                                    )
                                })}
                                {!dataArticle &&
                                    <div className="col-lg-12">
                                        waiting...
                                    </div>
                                }
                                {dataArticle && !dataArticle.length &&
                                    <div className="col-lg-12">
                                        No data Display!
                                    </div>
                                }
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

Article.Layout = PublicLayout;

export default Article;