// /src/pages/VerifyPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const token = searchParams.get('token'); // Extract the token from the URL

  useEffect(() => {
    if (token) {
      // Send the token to the backend for verification
      axios
        .get(`https://statusup-347c42d4df93.herokuapp.com/register/verify?token=${token}`)
        .then((response) => {
          // Handle successful verification
          setVerificationStatus('Verification successful! You can now log in.');
        })
        .catch((error) => {
          // Handle error if verification fails
          setVerificationStatus('Verification failed. Please check the token or try again.');
        });
    } else {
      setVerificationStatus('No token found in the URL.');
    }
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      {verificationStatus ? <p>{verificationStatus}</p> : <p>Verifying...</p>}
    </div>
  );
};

export default VerifyPage;
