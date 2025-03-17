import './App.css'
import './Auth.css'
import Button from './components/Button/Button.jsx';
import UploadCard from './components/UploadCard/UploadCard.jsx';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from '@aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';



function App() {

  async function uploadFile(file) {
    try {
      const result = await uploadData({
        key: filename,
        data: file
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }
  
  return (
    <>
      <div className='App'>
        <header>
          <div className='signOutButtonContainer'>
            <Button className="signOutButton" text="Sign out" onClick={() => signOut()}/>            
          </div>
          <img className='in10Logo' src="./src/images/in10Logo.svg" width="200px" alt="in10Logo"/>
        </header>
        <main>
          <div className='uploadCardsContainer'>
            <UploadCard text={'Upload arquivos plano de mídia'} onClick={() => uploadFile()}/>
            <UploadCard text={'Upload arquivos Tunad'} onClick={() => uploadFile()}/>
            <UploadCard text={'Upload arquivos Logan'} onClick={() => uploadFile()}/>
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
});
