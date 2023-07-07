import { useState } from "react";
import { Container } from "react-bootstrap";

import NavbarVertical from "./navbar/NavbarVertical";
import NavbarTop from "./navbar/NavbarTop";

const DefaultDashboardLayout = (props) => {
    const [showMenu, setShowMenu] = useState(true);

    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };

    return (
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value) => setShowMenu(value)}
                />
            </div>
            <div id="page-content">
                <div className="header">
                    <NavbarTop
                        data={{
                            showMenu: showMenu,
                            sidebarToggleMenu: ToggleMenu,
                            data: props.data
                        }}
                        logout={props.logout}
                    />
                </div>
                <Container fluid className="p-6">
                    {props.children}
                </Container>
            </div>
        </div>
    );
};

export default DefaultDashboardLayout;
