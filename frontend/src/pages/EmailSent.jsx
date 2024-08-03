
import { Link } from 'react-router-dom';

const EmailSent = () => {
  return (
    <div className="bg-dark min-h-screen text-white flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-4">Verification Link Sent</h1>
      <p className="mb-6 text-center">Please check your email and follow the link to verify your account.</p>
      <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        Back to Login
      </Link>
    </div>
  );
};

export default EmailSent;
