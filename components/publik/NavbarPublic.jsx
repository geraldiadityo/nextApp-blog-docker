import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link href="/" className="navbar-brand">Geraldi Media</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                    >
                        <span className="navbar-toggle-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link href="/articles" className="nav-link">Article</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { Navbar };
