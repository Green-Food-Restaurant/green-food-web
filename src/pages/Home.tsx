import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { userInfo, logout } = useAuth();

  return (
    <div>
      <h1>Bem-vindo, {userInfo?.name}!</h1>
      <img src={userInfo?.picture} alt="Profile" />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;