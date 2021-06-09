import { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../serviecs/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('현재 유저이름은 사용되고 있습니다. 다른 유저 이름을 사용하세요.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Mapstagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-xl items-center h-screen">
      <div className="flex w-3/6 ml-10 mr-5">
        <img src="/images/mapstagram-login2.png" alt="mapstagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo_text.png" alt="Mapstagram" className="mt-2 w-6/12 mb-4" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="user name"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 
            border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 
            border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="이메일"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 
            border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your Password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 
            border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              autoComplete="off"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && 'opacity-50'}`}
            >
              회원가입
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            계정이 있습니까?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
