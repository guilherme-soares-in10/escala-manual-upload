import './App.css'
import './Auth.css'
import Button from './components/Button/Button.jsx';
import UploadCard from './components/UploadCard/UploadCard.jsx';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut, fetchUserAttributes, getCurrentUser } from '@aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';
import { useState, useEffect } from 'react';
import { getCompanyConfig } from './config/companies';

function App() {
  const [userCompany, setUserCompany] = useState(null);
  const [companyConfig, setCompanyConfig] = useState(null);

  useEffect(() => {
    async function getUserCompany() {
      try {
        // First get the current authenticated user
        const currentUser = await getCurrentUser();
        console.log('Current user:', currentUser);
        
        // Then fetch the user attributes with custom attributes
        const attributes = await fetchUserAttributes({
          includeCustomAttributes: true
        });
        console.log('User attributes:', JSON.stringify(attributes, null, 2));
        
        // Check if we have the company attribute
        if (!attributes['custom:company']) {
          console.error('No company attribute found for user');
        }
        
        const company = attributes['custom:company'] || 'escala';
        console.log('Detected company:', company);
        setUserCompany(company);
        setCompanyConfig(getCompanyConfig(company));
      } catch (error) {
        console.error('Error getting user company:', error);
        setUserCompany('escala');
        setCompanyConfig(getCompanyConfig('escala'));
      }
    }
    getUserCompany();
  }, []);

  async function uploadFile(file, category) {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    try {
      // Create a unique filename with timestamp and company folder
      const timestamp = new Date().getTime();
      // Use companyConfig.displayName for the folder name
      const companyFolder = companyConfig?.displayName.toLowerCase().replace(/\s+/g, '-');
      const filename = `${companyFolder}/${category}/${timestamp}-${file.name}`;
      
      const result = await uploadData({
        key: filename,
        data: file,
        options: {
          contentType: file.type,
          metadata: {
            category: category,
            company: userCompany,
            uploadedAt: new Date().toISOString()
          }
        }
      }).result;

      console.log('Upload successful:', result);
      alert(`File ${file.name} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading file: ${error.message}`);
    }
  }

  return (
    <>
      <div className='App'>
        <header>
          <div className='signOutButtonContainer'>
          {companyConfig && (
              <div className='companyIndicator'>
                {companyConfig.displayName}
              </div>
            )}
            <Button className="signOutButton" text="Sign out" onClick={() => signOut()}/>            
          </div>
          <div>
            <img className='in10Logo' src="./src/images/in10Logo.svg" width="200px" alt="in10Logo"/>
          </div>
        </header>
        <main>
          <div className='uploadCardsContainer'>
            {companyConfig?.categories.map((card, index) => (
              <UploadCard 
                key={index}
                text={card.text}
                onClick={(file) => uploadFile(file, card.category)}
                cardId={card.category}
              />
            ))}
          </div>
        </main>
        <footer>
          <img className='businessman-finding-file' src="./src/images/businessman-finding-file2.svg" width="320px" alt="businessman-finding-file"/>
        </footer>
      </div>
    </>
  )
}

export default withAuthenticator(App, {
  components: {
    Header() {
      return (
        <div style={{ 
          textAlign: 'center',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <img 
            src="./src/images/in10Logo.svg" 
            alt="in10Logo" 
            style={{ width: '150px' }}
          />
        </div>
      );
    },
    Footer() {
      return (
        <div style={{ 
          textAlign: 'center',
          padding: '1rem',
          color: 'var(--tertiary-color)',
          fontSize: 'var(--small-font-size)'
        }}>
          © 2025 IN10
        </div>
      );
    },
  },
  formFields: {
    signIn: {
      username: {
        placeholder: 'Enter your username',
        label: 'Username',
      },
      password: {
        placeholder: 'Enter your password',
        label: 'Password',
      },
    },
    signUp: {
      username: {
        placeholder: 'Enter your username',
        label: 'Username',
      },
      password: {
        placeholder: 'Create a password',
        label: 'Password',
      },
      confirm_password: {
        placeholder: 'Confirm your password',
        label: 'Confirm Password',
      },
    },
  },
  variation: 'modal',
  loginMechanisms: ['username'],
  hideSignUp: true,
});
