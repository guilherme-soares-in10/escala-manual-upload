import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import CompanyManagement from '../CompanyManagement/CompanyManagement';
import Button from '../../common/Button/Button';
import AddCompanyModal from '../modals/AddCompanyModal/AddCompanyModal';
import { getCompanies } from '../../../services/companyService';

function AdminDashboard() {
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch companies
      console.log('Fetching companies...');
      const companiesData = await getCompanies();
      console.log('Fetched companies data:', JSON.stringify(companiesData, null, 2));
      
      // Ensure companies is an array and has the required fields
      const companiesArray = Array.isArray(companiesData) ? companiesData : [];
      console.log('Processed companies array:', JSON.stringify(companiesArray, null, 2));
      
      setCompanies(companiesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCompanyClick = () => {
    setIsAddCompanyModalOpen(true);
  };

  if (loading) {
    return (
      <main className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && (
        <div className="error-message">
          Error fetching data: {error}
        </div>
      )}
      <div className="admin-actions">
        <Button 
          text="Add New Company" 
          onClick={handleAddCompanyClick}
          backgroundColor="var(--primary-color)"
        />
      </div>
      <div className="company-management-container">
        {companies.length === 0 ? (
          <div>No companies found. Add your first company!</div>
        ) : (
          companies.map((company) => (
            <div key={company.companyId}>
              <CompanyManagement company={company} />
            </div>
          ))
        )}
      </div>
      {isAddCompanyModalOpen && (
        <AddCompanyModal 
          onClose={() => setIsAddCompanyModalOpen(false)}
          onCompanyAdded={fetchData}
        />
      )}
    </main>
  );
}

export default AdminDashboard;