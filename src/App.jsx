import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import EditEmployee from "./pages/EditEmployee";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import Profile from "./pages/Profile";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees"
                element={
                    <RoleProtectedRoute role="ADMIN">
                        <Employees />
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/employees/add"
                element={
                   <RoleProtectedRoute role="ADMIN">
                       <AddEmployee />
                   </RoleProtectedRoute>
                }
            />

            <Route
                path="/employees/edit/:id"
                element={
                    <RoleProtectedRoute role="ADMIN">
                        <EditEmployee />
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/departments"
                element={
                    <ProtectedRoute>
                        <Departments />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/departments/add"
                element={
                    <ProtectedRoute>
                        <AddDepartment />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/access-denied"
                element={<AccessDenied />}
            />
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;