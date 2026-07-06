import { useEffect, useState } from "react";
import api from "../api/api";

function Employees() {

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

    return (
        <div className="container mt-5">

            <h2>Employees</h2>

            <hr />

            <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>{employee.email}</td>

                            <td>{employee.department?.name}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Employees;