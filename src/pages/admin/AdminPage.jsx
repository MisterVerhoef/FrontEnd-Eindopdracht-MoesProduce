import {useContext, useEffect, useState} from "react";
import api from "../../services/api.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function AdminPage(){

    const [users, setUsers] = useState([])
    const { hasRole } = useContext(AuthContext);

    if (!hasRole('ROLE_ADMIN')) {
        return <div>Access Denied</div>;
    }

    useEffect(() => {
       api.get('/api/admin/users')
           .then(response =>{
               setUsers(response.data);
           })
           .catch(error => {
               console.error("Er is een fout opgetreden bij het ophalen van de users:", error.message)
           });
    }, []);

    return (

        <div className="outer-container" id="admin-container">
            <h1>Admin Control</h1>
            <div className="inner-form-container">
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email} (Rollen: {user.roles.join(', ')})
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default AdminPage;