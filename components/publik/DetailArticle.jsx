import { CategoriePublic, EditorPublic } from "@/widgets";
import Link from "next/link";
import Image from "next/image";
import { parseDate } from "@/lib/getDateTime";
const DetailArticle = (props) => {
    const data = props?.data;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    {/* post content */}
                    <article>
                        <header className="mb-4">
                            <h1>{data.title}</h1>
                            <div className="text-muted fst-italic mb-2">Publish At: {parseDate(data.publishAt)} - Author: {data.author.firstName} {data.author.lastName}</div>
                            <Link href={`/categorie/${data.categorie.nama}`} className="badge bg-secondary text-decoration-none link-light">{data.categorie.nama}</Link>
                        </header>
                        <figure className="mb-4">
                            <Image src={`/upload/content/${data.contentPic}`} className="img-fluid rounded" height={350} width={500} alt="Content Pic" />
                        </figure>
                        <section className="mb-5">
                            <EditorPublic data={data.content} />
                        </section>
                    </article>
                </div>
                <div className="col-lg-4">
                    <CategoriePublic />
                </div>
            </div>
        </div>
    )
}

export { DetailArticle };