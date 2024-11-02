import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import './AdminPage.css';

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

    const handleRoleChange = async (userId, newRole, currentRole) => {
        const roleName = newRole.replace('ROLE_', '');
        const user = users.find(u => u.id === userId);

        const isConfirmed = window.confirm(`Are you sure you want to change ${user.username}'s role from ${currentRole.replace('ROLE_', '')} to ${roleName}?`);

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await api.put(`/api/admin/users/${userId}/role?newRole=${roleName}`);
            console.log('Role update response:', response.data);
            fetchUsers();
        } catch (err) {
            console.error('Error updating role:', err);
            if (err.response) {
                setError(`Failed to update user role: ${err.response.data.message || err.response.data}`);
            } else {
                setError(`Failed to update user role: ${err.message}`);
            }
        }
    };

    const handleDeleteUser = async (userId, username) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the user ${username}? This action cannot be undone.`);

        if (!isConfirmed) {
            return;
        }

        try {
            await api.delete(`/api/users/${userId}`);
            console.log('User deleted successfully');
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
            if (err.response) {
                setError(`Failed to delete user: ${err.response.data.message || err.response.data}`);
            } else {
                setError(`Failed to delete user: ${err.message}`);
            }
        }
    };

    const getRoleName = (role) => {
        return role.replace('ROLE_', '');
    };

    if (!hasRole('ROLE_ADMIN')) {
        return <div className="access-denied">Access Denied. You do not have the ADMIN role.</div>;
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>User Management</h1>
            </header>
            <div className="admin-content">
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                                <p>Roles: {user.roles.map(getRoleName).join(', ')}</p>
                            </div>
                            <div className="user-actions">
                                <select
                                    value={user.roles[0]}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value, user.roles[0])}
                                >
                                    <option>Kies een User Role:</option>
                                    <option value="ROLE_USER">User</option>
                                    <option value="ROLE_SELLER">Seller</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                                <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="delete-user-btn"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;