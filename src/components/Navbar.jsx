import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    Employee Management
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    {role === "ADMIN" && (
                            <Link className="nav-link" to="/employees">
                                Employees
                            </Link>
                    )}

                    <Link className="nav-link" to="/departments">
                        Departments
                    </Link>

                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>

                </div>

                <div className="d-flex align-items-center">

                    <span className="text-white me-3">
                        👤 {username} ({role})
                    </span>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;