import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AddEdit } from "@/components/admin/role/AddEdit";
import { PageHeading } from "@/widgets";
import { Spinner } from "@/components/admin/Spinner";

import { roleService } from "@/services/role.services";

function Edit(){
    const router = useRouter();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        roleService.getOne(id)
        .then((res) => setRole(res.data))
        .catch((err) => console.log(err))
    },[router]);

    return (
        <>
            <PageHeading heading="Edit Role" />
            {role ? <AddEdit role={role} /> : <Spinner />}
        </>
    )
}

export default Edit;
