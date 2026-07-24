import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchEmployee();
    }, []);

     const fetchEmployee = async () => {

         try {

             const response = await api.get(`/employees/${id}`);

             setName(response.data.name);
             setEmail(response.data.email);

         } catch (error) {

             console.log(error);

             toast.error("Unable to load employee.");

         }

     };

 const handleUpdate = async () => {

     try {

         await api.put(`/employees/${id}`, {
             name,
             email,
             department: null
         });

         toast.success("Employee Updated Successfully!");

         navigate("/employees");

     } catch (error) {

         console.log(error);

         toast.error("Unable to update employee.");

     }

 };


     return (
            <div className="container mt-5">

                <h2>Edit Employee</h2>

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
                    onClick={handleUpdate}
                >
                    Update
                </button>

            </div>
        );
}

export default EditEmployee;