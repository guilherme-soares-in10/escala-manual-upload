import { useState } from 'react';
import Button from '../../../common/Button/Button';
import './AddCompanyModal.css';

const AddCompanyModal = ({ onClose }) => {
    const [newCompany, setNewCompany] = useState({
        displayName: '',
        companyAttribute: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCompany(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement company creation logic here
        console.log('Creating new company:', newCompany);
        onClose();
    };

    return (
        <div className="modal-overlay add-company-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Company</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <form className="add-company-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="displayName">Company Name</label>
                            <input
                                type="text"
                                id="displayName"
                                name="displayName"
                                value={newCompany.displayName}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter company display name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyAttribute">Company Attribute</label>
                            <input
                                type="text"
                                id="companyAttribute"
                                name="companyAttribute"
                                value={newCompany.companyAttribute}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter company attribute for Cognito"
                            />
                            <small className="form-help">
                                This will be used as the custom:company attribute in Cognito
                            </small>
                        </div>
                        <div className="form-actions">
                            <Button 
                                text="Cancel" 
                                onClick={onClose}
                                backgroundColor="var(--error-color)"
                            />
                            <Button 
                                text="Add Company" 
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyModal;
