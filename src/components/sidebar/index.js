import useUser from '../../hooks/use-user';
import User from './user.js';
import Suggestions from './suggestions';

export default function Sidebar() {
  const {
    user: { fullName, username, userId }
  } = useUser();

  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
