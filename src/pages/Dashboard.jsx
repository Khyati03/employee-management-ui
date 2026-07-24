import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Dashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        departmentEmployeeCounts: []
    });

    useEffect(() => {
        fetchDashboard();
        }, []);

    const fetchDashboard = async () => {
        try{
               const response = await api.get("/dashboard");
               setDashboard(response.data);
            } catch(error){
                console.log(error);
           }
        };

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

        </div>
    );
}

export default Dashboard;