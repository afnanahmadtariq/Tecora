import { Fragment, useState, forwardRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { signUp, login } from '../api/auth';
import { Popup } from '../components/Popup';
import { useUser } from '../context/UserContext';

const ModalOverlay = forwardRef(({ children }, ref) => (
  <div ref={ref} className="fixed inset-0 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-lg" />
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl">
          {children}
        </div>
      </div>
    </div>
  </div>
));

ModalOverlay.displayName = 'ModalOverlay';

export function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  
  // State to control visibility and message of the popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  // Function to trigger the popup
  const triggerPopup = (message) => {
    setIsWarning(true);
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000); 
  };

  // Regex for password strength check
  const passwordStrengthRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$%^&*?@#()_+\-=\[\]{};:'",.<>?/\\|`~])[A-Za-z\d!$%^&*?@#()_+\-=\[\]{};:'",.<>?/\\|`~]{8,}$/;


  // Validate username
  useEffect(() => {
    if (username && username.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
    } else {
      setUsernameError('');
    }
  }, [username]);

  // Validate email format
  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email && !emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Validate password strength
  useEffect(() => {
    if (password && !passwordStrengthRegEx.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain a letter, a number, and a special character.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  // Check if passwords match
  useEffect(() => {
    if (retypePassword && retypePassword !== password) {
      setRetypePasswordError('Passwords do not match.');
    } else {
      setRetypePasswordError('');
    }
  }, [retypePassword, password]);

  // Submit the form
  const handleSubmit = async () => {
    if (usernameError || emailError || passwordError || retypePasswordError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    setIsLoading(true); 
    const data = {
      username,
      email,
      password
    };

    const res = await signUp(data);

    if (res.status === 409) {
      res.json().then(err => {
        console.log(err.error);
        triggerPopup(err.error);
        setIsLoading(false);
      });
    };
    if (res.status === 201) {
      setUsername("");
      setEmail("");
      setPassword("");
      setRetypePassword("");
      setShowVerificationPopup(true);
      setIsLoading(false);
    }
  }

  const handleVerificationSuccess = () => {
    setShowVerificationPopup(false); 
    onSwitchToLogin();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-600/20 dark:bg-blue-900/20 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ModalOverlay>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Tecora</h3>
                    <Dialog.Title className="text-3xl font-bold text-gray-900 dark:text-white">
                      Sign up
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    />
                    {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type={showRetypePassword ? "text" : "password"}
                      placeholder="Retype Password"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    >
                      {showRetypePassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {retypePasswordError && <p className="text-red-500 text-sm">{retypePasswordError}</p>}
                  </div>


                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#38BDF8] text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                    disabled={usernameError || emailError || passwordError || retypePasswordError}
                  >
                    {isLoading? 'Validating...' : 'Sign up'}
                  </button>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="mb-4">Or Continue With</p>
                    <div className="flex justify-center space-x-4">
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/google.svg" alt="Google" className="w-5 h-5" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </ModalOverlay>
          </Transition.Child>
        </Dialog>
      </Transition>

      <EmailVerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => setShowVerificationPopup(false)}
        onVerify={handleVerificationSuccess}
      />
      <Popup message={popupMessage} showPopup={showPopup} isWarning={isWarning}/>
    </>
  );
}

function EmailVerificationPopup({ isOpen, onClose, onVerify }) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isValidEmail, setIsValidEmail] = useState(null);
  // State to control visibility and message of the popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Function to trigger the popup
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000); 
  };

  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };
  
  const handleVerify = async () => {
    setIsLoading(true);

    const isVerified = await verifyEmail(code.join('')); 

    setIsValidEmail(isVerified); 
    setIsLoading(false);
    onVerify();
  };

  const verifyEmail = async (code) => {
    return code === '123456'
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ModalOverlay>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                    Verify Email
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your email <span className="font-semibold">your.email@gmail.com</span> has sent a verification code.
                </p>

                {/* Code input fields */}
                <div className="flex space-x-2 mb-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(e, index)}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>

                {/* Conditional message based on verification status */}
                {isValidEmail !== null && (
                  <div className="mt-4 text-lg font-semibold">
                    {isValidEmail ? (
                      <p className="text-green-600">Verified</p>
                    ) : (
                      <p className="text-red-600">Invalid code</p>
                    )}

                    {/* Show options based on verification status */}
                    {isValidEmail ? (
                      <button
                        onClick={() => console.log('Redirect to login')}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                      >
                        Go to Login
                      </button>
                    ) : (
                      <div className="flex space-x-4 mt-4">
                        <button
                          onClick={() => console.log('Redirect to signup')}
                          className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Change Email
                        </button>
                        <button
                          onClick={() => console.log('Resend code')}
                          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                        >
                          Resend Code
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ModalOverlay>
          </Transition.Child>
        </Dialog>
      </Transition>
      <Popup message={popupMessage} showPopup={showPopup} />
    </>
  );
}


export function LoginModal({onLoginSuccess, isOpen, onClose, onSwitchToSignUp }) {
  const { saveToken } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // State to control visibility and message of the popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  // Function to trigger the popup
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000); 
  };

  // Validate username
  useEffect(() => {
    if (username && username.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
    } else {
      setUsernameError('');
    }
  }, [username]);

  // Validate email format
  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email && !emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }, [email]);


  const signIn = async () => {
    if (emailError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    setIsLoading(true);
    const data = {
      email,
      password,
    };
    const response = await login(data);
    const res = await response.json();
    if (res.message == "Logged in successfully"){
      setIsLoading(false);
      saveToken(res.token);
      triggerPopup("Logged in");
      onLoginSuccess();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-600/20 dark:bg-blue-900/20 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ModalOverlay>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Tecora</h3>
                    <Dialog.Title className="text-3xl font-bold text-gray-900 dark:text-white">
                      Login
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="username@gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <button className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={signIn}
                    className="w-full bg-[#38BDF8] text-white py-2 rounded-md hover:bg-blue-500 transition-colors">
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="mb-4">Or Continue With</p>
                    <div className="flex justify-center space-x-4">
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/google.svg" alt="Google" className="w-5 h-5" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignUp} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500">
                      Register for free
                    </button>
                  </p>
                </div>
              </div>
            </ModalOverlay>
          </Transition.Child>
        </Dialog>
      </Transition>
      <Popup message={popupMessage} showPopup={showPopup} isWarning={isWarning}/>
    </>
  );
}
