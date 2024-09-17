import {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext({});


// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');

            if (token) {
                const decodedToken = jwtDecode(token);
                setAuthState({
                    isAuth: true,
                    user: decodedToken,
                    status: 'done',
                });
            } else {
                setAuthState(prevState => ({
                    ...prevState,
                    status: 'done',
                }));

            }
            console.log('AuthContext - isAuthenticated changed:', authState);
        };
        checkAuth();
    },
        []);

    const login = ( JWT ) => {
        localStorage.setItem('token', JWT);

        const decodedToken = jwtDecode(JWT);
        setAuthState({
            isAuth: true,
            user: decodedToken,
            status: 'done',
        });
        console.log('Login successful, token stored');

        if (decodedToken.roles && decodedToken.roles.includes('ADMIN')) {
            navigate('/admin');
        } else {
            navigate('/');
        }

    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('Logout successful, token removed');
        navigate('/');
    };
    const contextData = {
        ...authState,
        login,
        logout
    };
    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;