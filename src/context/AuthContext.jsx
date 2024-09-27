import {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({});

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
                console.log('Decoded token:', decodedToken);
                const userRoles = decodedToken.roles || [];
                console.log('User roles:', userRoles);
                setAuthState({
                    isAuth: true,
                    user: {
                        ...decodedToken,
                        roles: userRoles
                    },
                    status: 'done',
                });
            } else {
                setAuthState(prevState => ({
                    ...prevState,
                    status: 'done',
                }));
            }
        };
        checkAuth();
    }, []);

    const login = (JWT) => {
        localStorage.setItem('token', JWT);

        const decodedToken = jwtDecode(JWT);
        console.log('Login - Decoded token:', decodedToken);
        const userRoles = decodedToken.roles || [];
        console.log('Login - User roles:', userRoles);
        setAuthState({
            isAuth: true,
            user: {
                ...decodedToken,
                roles: userRoles
            },
            status: 'done',
        });
        console.log('Login successful, token stored');

        if (userRoles.includes('ROLE_ADMIN')) {
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

    const hasRole = (role) => {
        console.log('Checking role:', role);
        console.log('Current user:', authState.user);
        console.log('User roles:', authState.user?.roles);
        const fullRoleName = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
        return authState.user && authState.user.roles && authState.user.roles.includes(fullRoleName);
    };

    const contextData = {
        ...authState,
        login,
        logout,
        hasRole
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;