import { Menu } from "react-feather";
import Link from "next/link";
import {
    Nav,
    Navbar,
    Form
} from 'react-bootstrap';

import QuickMenu from "../QuikMenu";

const NavbarTop = (props) => {
    return (
        <Navbar expand="lg" className="navbar-classic navbar navbar-expand-lg">
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex align-item-center">
                    <Link
                        href="#"
                        id="nav-toggle"
                        className="nav-icon me-2 icon-xs"
                        onClick={() => props.data.sidebarToggleMenu(!props.data.showMenu)}>
                            <Menu size="18px"/>
                    </Link>
                    <div className="ms-lg-3 d-none d-md-none d-lg-block">
                        <Form className="d-flex align-items-center">
							<Form.Control type="search" placeholder="Search" />
						</Form>
                    </div>
                </div>
                <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
                    <QuickMenu logout={props.logout}/>
                </Nav>
            </div>
        </Navbar>
    )
}

export default NavbarTop;
