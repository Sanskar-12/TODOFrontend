import { useContext } from "react";
import { Context } from "../main";
import Loader from "../Components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
  ) : (
    <h1>Not Logged In</h1>
  );
};

export default Profile;
