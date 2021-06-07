import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import Map from '../components/Map';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';

export default function Dashboard({ user: loggedInUser }) {
  const { user } = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = 'Mapstagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gary-backgorund">
        <Header />
        <Sidebar />
        <div className="grid grid-cols-2 gap-4 justify-between mx-auto max-w-screen-lg">
          <Map />
          <Timeline />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
