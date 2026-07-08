import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Departments() {

    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {

        try {

            const response = await api.get("/departments");

            setDepartments(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load departments");

        }

    };

    return (
        <div className="container mt-5">

            <h2>Departments</h2>

            <hr />

            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/departments/add")}
            >
                Add Department
            </button>

            <table className="table table-bordered">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>

                </thead>

                <tbody>

                    {departments.map((department) => (

                        <tr key={department.id}>

                            <td>{department.id}</td>

                            <td>{department.departmentName}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Departments;