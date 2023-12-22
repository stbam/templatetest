import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");
    const [confirmUser, setConfirmUser] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        // Check if username and confirm username match
        if (user !== confirmUser) {
            toast.error("Username and Confirm Username do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/signup", {
                email,
                password,
                username: user,
            });

            if (res.data === "exist") {
                toast.error("User already exists");
            } else if (res.data === "notexist") {
                history("/home", { state: { id: email } });
            }
        } catch (error) {
            toast.error("Wrong details");
            console.log(error);
        }
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form action="POST">
                <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Username" />
                <input type="text" onChange={(e) => setConfirmUser(e.target.value)} placeholder="Confirm Username" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <input type="submit" onClick={submit} />
            </form>
            <Link to="/">Go back to login page</Link>
            <ToastContainer />
        </div>
    );
}

export default Signup;
