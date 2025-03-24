import './App.css'
import './Auth.css'
import Button from './components/Button/Button.jsx';
import UploadCard from './components/UploadCard/UploadCard.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';
import { withAuthenticator, ThemeProvider, createTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut, fetchUserAttributes, getCurrentUser } from '@aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';
import { useState, useEffect } from 'react';
import { getCompanyConfig } from './config/companies';

const theme = createTheme({
  name: 'in10-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          // Use your primary color and Amplify will generate the scale
          10: '#520f3010',
          20: '#520f3020',
          40: '#520f3040',
          60: '#520f3060',
          80: '#520f3080',
          90: '#520f3090',
          100: '#520f30', // Your primary color
        },
      },
      background: {
        primary: { value: '#ffffff' }, // White background
        secondary: { value: '#f8f9fa' }, // Light gray for secondary areas
      },
      font: {
        interactive: { value: '#520f30' }, // Your primary color for interactive text
      },
    },
    fonts: {
      default: {
        variable: { value: 'Inter, sans-serif' }, // Match your app font
        static: { value: 'Inter, sans-serif' },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.100}' },
          _hover: {
            backgroundColor: { value: '{colors.brand.primary.90}' },
          },
        },
      },
      authenticator: {
        modal: {
          backgroundColor: { value: '{colors.background.primary}' },
          borderRadius: { value: '8px' },
          boxShadow: { value: '0 4px 20px rgba(0, 0, 0, 0.15)' },
        },
      },
    },
  },
});

function App() {
  const [userCompany, setUserCompany] = useState(null);
  const [companyConfig, setCompanyConfig] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
        
        // Check if user is admin
        const company = attributes['custom:company'];
        setIsAdmin(company === 'admin');
        
        if (!company) {
          console.error('No company attribute found for user');
        }
        
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
            {companyConfig && !isAdmin && (
              <div className='companyIndicator'>
                {companyConfig.displayName}
              </div>
            )}
            {isAdmin && (
              <div className='adminIndicator'>
                Admin 
              </div>
            )}
            <Button className="signOutButton" text="Sign out" onClick={() => signOut()}/>            
          </div>
          <div>
            <img className='in10Logo' src="./src/images/in10Logo.svg" width="200px" alt="in10Logo"/>
          </div>
        </header>
        <main>
          {isAdmin ? (
            <AdminDashboard />
          ) : (
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
          )}
        </main>
        <footer>
          <p>© 2025 IN10</p>
        </footer>
      </div>
    </>
  )
}

const AuthenticatedApp = withAuthenticator(App, {
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

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticatedApp />
    </ThemeProvider>
  );
}