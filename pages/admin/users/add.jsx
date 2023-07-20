import { AddEdit } from "@/components/admin/user/AddEdit";
import { useEffect, useState } from "react";
import { PageHeading } from "@/widgets";
import { roleService } from "@/services/role.services";

function Add(){
    return (
        <>
            <PageHeading heading="Add New User" />
            <AddEdit />
        </>
    )
};

export default Add;
