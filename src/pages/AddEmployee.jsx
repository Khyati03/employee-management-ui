import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function AddEmployee() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSave = async () => {

        try {

            await api.post("/employees", {
                name,
                email,
                department: {
                    id: Number(selectedDepartment)
                }
            });

            toast.success("Employee Added Successfully!");

            navigate("/employees");

        } catch (error) {

            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log(error);

            toast.error("Unable to save employee.");

        }
    };

const fetchDepartments = async () => {

    try {

        const response = await api.get("/departments");

        console.log(response.data);
        setDepartments(response.data);

    } catch (error) {

            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log(error.response.data);
            console.log(error);

            toast.error("Unable to save employee.");

    }

};

    return (
        <div className="container mt-5">

            <h2>Add Employee</h2>

            <hr />

            <div className="mb-3">

                <label>Name</label>

                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <div className="mb-3">

                <label>Email</label>

                <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <div className="mb-3">

                <label>Department</label>

                <select
                    className="form-select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >

                    <option value="">Select Department</option>

                    {departments.map((department) => (

                        <option
                            key={department.id}
                            value={department.id}
                        >
                            {department.departmentName}
                        </option>

                    ))}

                </select>

            </div>

            <button
                className="btn btn-primary"
                onClick={handleSave}
            >
                Save
            </button>

        </div>
    );
}

export default AddEmployee;