import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import NavbarVertical from "./navbar/NavbarVertical";
import NavbarTop from "./navbar/NavbarTop";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import jwt from 'jsonwebtoken'

export const getServerSideProps = async ({req, res}) => {
    const cookie = getCookie('token', {req, res});
    if (!cookie) return { props: {isAuthenticated: false} }

    try{
        const isAuthenticated = await jwt.verify(cookie, process.env.JWT_SECRET_KEY);
        return { props: {isAuthenticated: isAuthenticated} }
    } catch(err){
        return { props: {isAuthenticated: false} }
    }
};
const DefaultDashboardLayout = (props) => {
    const [showMenu, setShowMenu] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
    const router = useRouter();

    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!isLoggedIn){
            router.push('/auth');
        }
    },[isLoggedIn]);

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
                        }}
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
