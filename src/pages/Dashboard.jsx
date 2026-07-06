function Dashboard() {
    return (
        <div className="container mt-5">

            <h2>Employee Management Dashboard</h2>

            <hr />

            <h4>Welcome Admin</h4>

            <div className="mt-4">

                <button className="btn btn-primary me-3">
                    Employees
                </button>

                <button className="btn btn-success me-3">
                    Departments
                </button>

                <button className="btn btn-danger">
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;