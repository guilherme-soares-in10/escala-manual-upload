import { useState } from 'react';
import Button from '../../../common/Button/Button';
import './AddUserModal.css';

const AddUserModal = ({ onClose, company }) => {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // TODO: Implement user creation logic here
        console.log('Creating new user:', newUser);
        onClose();
    };

    return (
        <div className="modal-overlay add-user-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New User - {company.displayName}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <form className="add-user-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={newUser.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={newUser.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <Button 
                                text="Cancel" 
                                onClick={onClose}
                                backgroundColor="var(--error-color)"
                            />
                            <Button 
                                text="Add User" 
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
