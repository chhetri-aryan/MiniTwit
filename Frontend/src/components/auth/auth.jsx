import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [arr, setArr] = useState([]);
    const [last, setLast] = useState(0);
    const [followStatus, setFollowStatus] = useState();



    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        setUser("")
        return localStorage.removeItem("token");
    }

    
    const userAuthentication = async () => {
        const URL = "http://localhost:5000/api/auth/user";
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.ok) {
                const data = await response.json();
                setUser(data)
                

            }

        } catch(error) {
            console.log("Error at userauthentication", error);
        }
    }

    useEffect( ()=> {
        userAuthentication();
    }, [token]);


    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, userAuthentication, 
    setUser, arr, setArr, last, setLast, setFollowStatus, followStatus}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    return authContextValue;
}

