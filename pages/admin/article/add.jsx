import { AddEdit } from "@/components/admin/artikel/AddEdit";
import { PageHeading } from "@/widgets";
import { useSelector } from "react-redux";
const Add = () => {
    const user = useSelector((state) => state.auth?.user);
    return (
        <>
            <PageHeading heading="Create New Article" />
            <AddEdit user={user} />
        </>
    )
};

export default Add;
