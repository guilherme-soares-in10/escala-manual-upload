import { useState } from 'react';
import Button from '../../../common/Button/Button';
import { createCompany } from '../../../../services/companyService';
import './AddCompanyModal.css';

const AddCompanyModal = ({ onClose, onCompanyAdded }) => {
    const [newCompany, setNewCompany] = useState({
        companyId: '',
        displayName: '',
        categories: [
            {
                text: 'Upload arquivos plano de mídia',
                category: 'plano-midia'
            },
            {
                text: 'Upload arquivos Tunad',
                category: 'tunad'
            },
            {
                text: 'Upload arquivos Logan',
                category: 'logan'
            }
        ]
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
        try {
            // Create company in DynamoDB
            await createCompany(newCompany);
            
            // Call the callback to refresh the companies list
            if (onCompanyAdded) {
                onCompanyAdded();
            }
            
            onClose();
        } catch (error) {
            console.error('Error creating company:', error);
            alert('Error creating company: ' + error.message);
        }
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
                            <label htmlFor="companyId">Company ID</label>
                            <input
                                type="text"
                                id="companyId"
                                name="companyId"
                                value={newCompany.companyId}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter company ID (e.g., company-name)"
                            />
                            <small className="form-help">
                                This will be used as the unique identifier for the company
                            </small>
                        </div>
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
