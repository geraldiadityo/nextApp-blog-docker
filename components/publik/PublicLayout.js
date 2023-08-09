import Head from "next/head";
import { Navbar } from "./NavbarPublic";
import { Footer } from "./FooterPublic";
const PublicLayout = (props) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="public home page geraldi media" />
                <meta name="author" content="geraldi adityo" />
                <title>Geraldi Media</title>
                <link rel="icon" type="image/x-icon" href="/publik/assets/favicon.ico" />
                <link rel="stylesheet" href="/publik/css/styles.css" />
                <script src="/publik/js/scripts.js" />
            </Head>
            <Navbar />
            <div>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default PublicLayout;
