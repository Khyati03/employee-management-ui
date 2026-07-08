import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AddDepartment() {

    const [departmentName, setDepartmentName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {

        try {

            await api.post("/departments", {
                departmentName
            });

            alert("Department Added Successfully!");

            navigate("/departments");

        } catch (error) {

            console.log(error);

            alert("Unable to add department.");

        }

    };

    return (
        <div className="container mt-5">

            <h2>Add Department</h2>

            <hr />

            <input
                className="form-control mb-3"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />

            <button
                className="btn btn-success"
                onClick={handleSubmit}
            >
                Save
            </button>

        </div>
    );
}

export default AddDepartment;