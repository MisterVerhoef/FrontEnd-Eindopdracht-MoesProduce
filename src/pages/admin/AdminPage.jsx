import {useContext, useEffect, useState} from "react";
import api from "../../services/api.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { hasRole } = useContext(AuthContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/admin/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/api/admin/users/${userId}/role`, { role: newRole });
            fetchUsers();
        } catch (err) {
            setError('Failed to update user role');
        }
    };

    if (!hasRole('ADMIN')) {
        return <div className="access-denied">Access Denied. You do not have the ADMIN role.</div>;
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="outer-form-container" id="admin-container">
            <header className="admin-header">
                <h1>User Management</h1>
            </header>
            <div className="inner-form-container">
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                                <p>Roles: {user.roles.join(', ')}</p>
                            </div>
                            <div className="user-actions">
                                <select
                                    value={user.roles[0]}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="SELLER">SELLER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;