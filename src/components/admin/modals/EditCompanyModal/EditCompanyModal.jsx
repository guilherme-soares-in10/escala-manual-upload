import { useState } from 'react';
import UserList from '../../UserList/UserList';
import FileCategoryList from '../../FileCategoryList/FileCategoryList';
import './EditCompanyModal.css';

const EditCompanyModal = ({ company, onClose }) => {
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'categories'

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">
                        <h2>Edit Company: {company.displayName}</h2>
                        <p className="company-attribute">Company Attribute: {company.companyAttribute}</p>
                    </div>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div className="tab-labels">
                        <label 
                            className={`tab-label ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            User List
                        </label>
                        <label 
                            className={`tab-label ${activeTab === 'categories' ? 'active' : ''}`}
                            onClick={() => setActiveTab('categories')}
                        >
                            File Category List
                        </label>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'users' ? (
                            <UserList company={company} />
                        ) : (
                            <FileCategoryList company={company} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCompanyModal; 