import { useState } from 'react';
import Button from '../../common/Button/Button';
import EditCompanyModal from '../modals/EditCompanyModal/EditCompanyModal';
import './CompanyManagement.css';

const CompanyManagement = ({ company }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="company-management">
                <p>{company.displayName}</p>
                <div className="company-management-buttons">
                    <Button text={'Delete'} backgroundColor={'var(--error-color)'}></Button>
                    <Button text={'Edit'} onClick={handleEditClick}></Button>  
                </div>
            </div>
            {isModalOpen && (
                <EditCompanyModal 
                    company={company} 
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default CompanyManagement;