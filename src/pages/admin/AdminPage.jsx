import {useEffect, useState} from "react";
import api from "../../services/api.js";

function AdminPage(){

    const [users, setUsers] = useState([])

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

        <div>
            <h1>Admin Control</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email} (Rollen: {user.roles.join(', ')})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;