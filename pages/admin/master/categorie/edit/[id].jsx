import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AddEdit } from "@/components/admin/master/categorie/AddEdit";
import { PageHeading } from "@/widgets";
import { Spinner } from "@/components/admin/Spinner";

import { categorieService } from "@/services/master/categorie.services";

function Edit(){
    const router = useRouter();
    const [categorie, setCategorie] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
        categorieService.getOne(id)
        .then((res) => setCategorie(res.data))
        .catch(err => console.log(err));
    },[router]);
    
    return (
        <>
            <PageHeading heading="Edit Categorie" />
            {categorie ? <AddEdit categorie={categorie} /> : <Spinner/>}
        </>
    )
};

export default Edit;

