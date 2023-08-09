import Link from "next/link";
import { categorieService } from "@/services/master/categorie.services";
import { useState, useEffect } from "react";

const CategoriePublic = (props) => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        categorieService.getall()
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    },[]);
    return (
        <div className="card mb-4">
            <div className="card-header">Categorie</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="list-styled mb-0">
                            {categories && categories.map((data, index) => {
                                return (
                                    <li><Link href={`/categorie/${data.nama}`}>{data.nama}</Link></li>
                                )
                            })}
                            {categories && !categories.length &&
                                <div>No data Display</div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriePublic;
