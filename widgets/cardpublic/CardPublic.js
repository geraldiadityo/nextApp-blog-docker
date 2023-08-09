import Image from "next/image";
import Link from "next/link";
import { parseDate } from "@/lib/getDateTime";
const CardPublik = (props) => {
    const data = props?.data;

    return (
        <div className="card mb-4">
            <Image
                src={`/upload/content/${data.contentPic}`}
                width={500}
                height={350}
                alt="Content Pic"
                className="card-img-top"
            />
            <div className="card-body">
                <div className="small text-muted">Publish: {parseDate(data.publishAt)}</div>
                <h2 className="card-title h4">{data.title}</h2>
                <p className="card-text">Categorie: {data.categorie.nama}</p>
                <p className="card-text">Author: {data.author.firstName} {data.author.lastName}</p>
                <Link className="btn btn-primary" href={`/detail/${data.id}`}>Read More →</Link>
            </div>
        </div>
    )
}

export default CardPublik;
