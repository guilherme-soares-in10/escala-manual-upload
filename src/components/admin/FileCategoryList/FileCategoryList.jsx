import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import AddFileCategoryModal from '../modals/AddFileCategoryModal/AddFileCategoryModal';
import './FileCategoryList.css';

const FileCategoryList = ({ company }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (category) => {
        // TODO: Implement delete functionality
        console.log('Deleting category:', category);
    };

    return (
        <div className="file-category-list">
            <div className="file-category-header">
                <h3>File Categories for {company.displayName}</h3>
                <Button 
                    text="Add New File Category" 
                    onClick={handleAddClick}
                    backgroundColor="var(--primary-color)"
                />
            </div>
            <div className="categories-container">
                {company.categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <div className="category-info">
                            <div className="category-details">
                                <span className="category-label">{category.text}</span>
                                <span className="category-id">File category: {category.category}</span>
                            </div>
                            <Button 
                                text="Delete" 
                                onClick={() => handleDeleteClick(category)}
                                backgroundColor="var(--error-color)"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {isAddModalOpen && (
                <AddFileCategoryModal 
                    company={company}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}
        </div>
    );
};

export default FileCategoryList; 