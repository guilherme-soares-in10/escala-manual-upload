import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import CompanyManagement from '../CompanyManagement/CompanyManagement';
import Button from '../../common/Button/Button';
import AddCompanyModal from '../modals/AddCompanyModal/AddCompanyModal';
import { companies } from '../../../config/companies';
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';

// The User Pool ID of your Cognito User Pool
const userPoolId = "us-east-1_VuG436BdF";  // Replace this with your actual User Pool ID

function AdminDashboard() {
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First check if user is authenticated
        const user = await getCurrentUser();
        if (!user) {
          console.log('No authenticated user found');
          return;
        }

        // Get the current session credentials
        const { credentials } = await fetchAuthSession();
        
        // Create the Cognito client with the session credentials
        const client = new CognitoIdentityProviderClient({
          region: "us-east-1",
          credentials: {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken
          }
        });

        // Create the ListUsersCommand object
        const command = new ListUsersCommand({
          UserPoolId: userPoolId,
        });

        // Send the command and fetch the users
        const data = await client.send(command);

        // Store users in state
        setUsers(data.Users || []);
        
        // Log all users to the console
        console.log("Users in the User Pool:");
        data.Users.forEach(user => {
          console.log(user.Username);
          console.log(user.Attributes);
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once when component mounts

  const handleAddCompanyClick = () => {
    setIsAddCompanyModalOpen(true);
  };

  return (
    <main className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && (
        <div className="error-message">
          Error fetching users: {error}
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
        {/* Iterate over the companies and render a CompanyManagement component for each one */}
        {Object.keys(companies).map((companyKey) => {
          const company = companies[companyKey];
          return (
            <div key={companyKey}>
              <CompanyManagement company={company} />
            </div>
          );
        })}
      </div>
      {isAddCompanyModalOpen && (
        <AddCompanyModal 
          onClose={() => setIsAddCompanyModalOpen(false)}
        />
      )}
    </main>
  );
}

export default AdminDashboard;