import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [size] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const role = localStorage.getItem("role");

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

    const handleDelete = (employee) => {

       setSelectedEmployee(employee);

       setShowModal(true);

    };
    const confirmDelete = async () => {

        try {

            await api.delete(`/employees/${selectedEmployee.id}`);

            toast.success("Employee deleted successfully!");

            fetchEmployees();

        } catch (error) {

            console.log(error.response?.status);
            console.log(error.response?.data);

            toast.error("Unable to delete employee.");

        } finally {

            setShowModal(false);

            setSelectedEmployee(null);

        }

    };

    const downloadCsv = async () => {

        try {

            const response = await api.get("/employees/export/csv", {
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute("download", "employees.csv");

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">

            <h2>Employees</h2>

            <hr />

            {role === "ADMIN" && (
                <div className="d-flex justify-content-center gap-3 mb-4">

                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/employees/add")}
                    >
                        Add Employee
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={downloadCsv}
                    >
                        Export CSV
                    </button>

                </div>
            )}

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

                                    {role === "ADMIN" ? (
                                            <>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(employee)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-muted">View Only</span>
                                        )}

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

            {showModal && (
                <div
                    className="modal show fade d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Delete Employee
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete
                                    <strong> {selectedEmployee?.name}</strong>?
                                </p>
                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
        </>
    );
}

export default Employees;