import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AddEmployee() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSave = async () => {

        try {

            await api.post("/employees", {
                name,
                email,
                department: null
            });

            alert("Employee Added Successfully!");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Unable to save employee.");

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