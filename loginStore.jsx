import React, { useState } from "react";
import { loginContext } from "./loginContext";

function LoginStore({ children }) {
    let [currentUser, setCurrentUser] = useState(null);
    let [userLoginStatus, setUserLoginStatus] = useState(false);
    let [err, setErr] = useState("");

    async function loginUser(userCred) {
        try {
            let res = await fetch(`http://localhost:4000/users-api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCred)
            });

            let result = await res.json();
            console.log(result);

            if (result.message === "Login success") {
                let user = result.user;
                sessionStorage.setItem("authToken", result.token); 
                setCurrentUser(user);
                setUserLoginStatus(true);
                setErr("");
            } else {
                setUserLoginStatus(false);
                setErr(result.message);
            }
        } catch (error) {
            setErr(error.message);
        }
    }

    function logoutUser() {
        sessionStorage.removeItem("authToken"); 
        setCurrentUser(null);
        setUserLoginStatus(false);
        setErr("");
    }

    return (
        <loginContext.Provider value={{ loginUser, logoutUser, userLoginStatus, err, currentUser, setCurrentUser, setUserLoginStatus }}>
            {children}
        </loginContext.Provider>
    );
}

export default LoginStore;