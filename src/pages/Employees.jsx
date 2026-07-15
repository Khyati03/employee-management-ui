import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
            alert("Unable to load employees");
        }
    };

 const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/employees/${id}`);

            alert("Employee deleted successfully!");

            fetchEmployees();

        } catch (error) {

            console.log(error);

            alert("Unable to delete employee.");

        }

    };

    return (
        <div className="container mt-5">

            <h2>Employees</h2>

            <hr />

            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/employees/add")}
            >
                Add Employee
            </button>

            <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>{employee.email}</td>

                            <td>{employee.department?.departmentName}</td>

                            <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Employees;