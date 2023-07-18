import { AddEdit } from "@/components/admin/role/AddEdit";
import { PageHeading } from "@/widgets";

function Add(){
    return (
        <>
            <PageHeading heading="Create New Role" />
            <AddEdit />
        </>
    )
}

export default Add;
