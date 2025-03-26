import { useState } from 'react';
import Button from '../../../common/Button/Button';
import './AddFileCategoryModal.css';

const AddFileCategoryModal = ({ onClose, company }) => {
    const [newCategory, setNewCategory] = useState({
        label: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement category creation logic here
        console.log('Creating new category:', newCategory);
        onClose();
    };

    return (
        <div className="modal-overlay add-file-category-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New File Category - {company.displayName}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <form className="add-file-category-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="label">Label</label>
                            <input
                                type="text"
                                id="label"
                                name="label"
                                value={newCategory.label}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter category label"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">File Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={newCategory.category}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter file category"
                            />
                            <small className="form-help">
                                This will be used as the category identifier in the system
                            </small>
                        </div>
                        <div className="form-actions">
                            <Button 
                                text="Cancel" 
                                onClick={onClose}
                                backgroundColor="var(--error-color)"
                            />
                            <Button 
                                text="Add Category" 
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFileCategoryModal; 