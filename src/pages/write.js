/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import MAP from '../components/Map';

// 직접 넣은것 시작
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Header from '../components/header';
// 직접 넣은것 끝.

export default function Write() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')).displayName);
  // eslint-disable-next-line
  Map.mouseon
  // eslint-disable-next-line
  //let lng = Map.message;

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const handleWrite = async (event) => {
    event.preventDefault();
    try {
      await firebase.firestore().collection('photos').add({
        caption: caption.toLowerCase(),
        comments: [],
        dateCreated: Date.now(),
        imageSrc: '',
        likes: [],
        photoID: '',
        userId: user,
        userLatitude: '',
        userLongtitude: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      history.push(ROUTES.DASHBOARD);
    }
  };
  useEffect(() => {
    document.title = 'Write - Mapstagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <form onSubmit={handleWrite} method="POST">
        <div className="bg-gray-background">
          <Header />
        </div>
        <div className="flex h-screen bg-gray-200 items-center justify-center  mt-32 mb-32">
          <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
            <div className="flex justify-center py-4">
              <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex justify-center">
                <h1 className="text-gray-600 font-bold md:text-2xl text-xl mb-2">게시글 업로드</h1>
              </div>
            </div>
            <div className="flex flex justify-center">
              <h1 className="text-gray-300 font-bold md:text-sm text-xl text-light font-semibold mb-1">
                경로 선택
              </h1>
            </div>
            <div className="flex justify-center">
              <MAP />
            </div>
            <div className="grid grid-cols-1 mt-5 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                사진 업로드
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                      사진을 선택하시오.
                    </p>
                  </div>
                  <input type="file" className="" />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 h-50 mt-5 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                게시글
              </label>
              <textarea
                required=""
                name="caption"
                placeholder="caption"
                className="w-full min-h-[100px] max-h-[500px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                onChange={({ target }) => setCaption(target.value)}
                spellCheck="false"
                value={caption}
              />
            </div>
            <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
              <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-black px-4 py-2">
                취소
              </button>
              <button
                type="submit"
                className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-black px-4 py-2"
              >
                올리기
              </button>
            </div>
          </div>
        </div>
      </form>
    </LoggedInUserContext.Provider>
  );
}
