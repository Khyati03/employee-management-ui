import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {

        setUsername(localStorage.getItem("username"));
        setRole(localStorage.getItem("role"));

    }, []);

    return (
        <>
                <Navbar />

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        👤 My Profile
                    </h2>

                    <h4>
                        Welcome, {username} 👋
                    </h4>

                    <hr />

                    <p>
                        <strong>Username :</strong> {username}
                    </p>

                    <p>
                        <strong>Role :</strong> {role}
                    </p>

                </div>

            </div>

        </div>
        </>

    );
}

export default Profile;