import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [size] = useState(2);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchEmployees();
    }, [page]);

    const fetchEmployees = async () => {

        try {

            let response;

            if (searchName.trim() !== "") {

                response = await api.get(
                    `/employees/search?name=${searchName}`
                );

                setEmployees(response.data);

            } else if (sortField !== "") {

                response = await api.get(
                    `/employees/sort?field=${sortField}&direction=${sortDirection}`
                );

                setEmployees(response.data);

            } else {

                response = await api.get(
                    `/employees/page?page=${page}&size=${size}`
                );

                setEmployees(response.data.content);
                setTotalPages(response.data.totalPages);

            }

        } catch (error) {

            console.log(error);

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

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search employee by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
            </div>

            <button
                className="btn btn-primary mb-3"
                onClick={fetchEmployees}
            >
                Search
            </button>

            <div className="row mb-3">

                <div className="col-md-4">

                    <label>Sort By</label>

                    <select
                        className="form-select"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >

                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>

                    </select>

                </div>

                <div className="col-md-4">

                    <label>Order</label>

                    <select
                        className="form-select"
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                    >

                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>

                    </select>

                </div>

            </div>

            <button
                className="btn btn-secondary mb-3 ms-2"
                onClick={fetchEmployees}
            >
                Sort
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
            <div className="d-flex justify-content-between mt-3">

                <button
                    className="btn btn-secondary"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    className="btn btn-secondary"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default Employees;