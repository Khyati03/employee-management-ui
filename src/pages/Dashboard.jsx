import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        departmentEmployeeCounts: []
    });
    const [view, setView] = useState("table");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
        }, []);

    const fetchDashboard = async () => {

        setLoading(true);

        try {

            const response = await api.get("/dashboard");

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="d-flex justify-content-center align-items-center vh-100">

                <div className="spinner-border text-primary" role="status">

                    <span className="visually-hidden">Loading...</span>

                </div>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <h2>Dashboard</h2>

            <hr />

            <div className="row">

                <div className="col-md-6 mb-4">

                    <div className="card bg-primary text-white shadow-lg">

                        <div className="card-body text-center">

                            <h5>Total Employees</h5>

                            <h1>{dashboard.totalEmployees}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card bg-success text-white shadow-lg">

                        <div className="card-body text-center">

                            <h5>Total Departments</h5>

                            <h1>{dashboard.totalDepartments}</h1>

                        </div>

                    </div>

                </div>

            </div>

            <hr />

            <div className="mb-3">

                <button
                    className={`btn ${view === "table" ? "btn-primary" : "btn-outline-primary"} me-2`}
                    onClick={() => setView("table")}
                >
                    Tabular View
                </button>

                <button
                    className={`btn ${view === "chart" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setView("chart")}
                >
                    Graphical View
                </button>

            </div>

            {view === "table" && (
                <>

            <h4>Employees by Department</h4>

            <table className="table table-bordered mt-3">

                <thead>

                    <tr>

                        <th>Department</th>
                        <th>Employees</th>

                    </tr>

                </thead>

                <tbody>

                    {dashboard.departmentEmployeeCounts?.map((item) => (

                        <tr key={item.departmentName}>

                            <td>{item.departmentName}</td>

                            <td>{item.employeeCount}</td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </>
            )}

            <hr />

            {view === "chart" && (
                <>

            <h4>Employees by Department (Chart)</h4>

            <div style={{ width: "100%", height: 350 }}>

                <ResponsiveContainer>

                    <BarChart
                        data={dashboard.departmentEmployeeCounts}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="departmentName" />

                        <YAxis />

                        <Tooltip
                            formatter={(value) => [`${value} Employees`, "Count"]}
                        />

                        <Bar
                            dataKey="employeeCount"
                                fill="#0d6efd"
                                radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>
             </>
            )}

        </div>
    );
}

export default Dashboard;