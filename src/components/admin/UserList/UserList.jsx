import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import AddUserModal from '../modals/AddUserModal/AddUserModal';
import './UserList.css';

const UserList = ({ company }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    return (
        <div className="user-list">
            <div className="user-list-header">
                <h3>Users for {company.displayName}</h3>
                <Button 
                    text="Add New User" 
                    onClick={handleAddClick}
                    backgroundColor="var(--primary-color)"
                />
            </div>
            <div className="users-container">
                {/* User list content will go here */}
            </div>
            {isAddModalOpen && (
                <AddUserModal 
                    company={company}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}
        </div>
    );
};

export default UserList; 