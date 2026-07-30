import { Link } from "react-router-dom";

function AccessDenied() {
    return (
        <div className="container text-center mt-5">

            <h1 className="display-3 text-danger">403</h1>

            <h3>Access Denied</h3>

            <p className="text-muted">
                You do not have permission to access this page.
            </p>

            <Link
                to="/dashboard"
                className="btn btn-primary mt-3"
            >
                Back to Dashboard
            </Link>

        </div>
    );
}

export default AccessDenied;