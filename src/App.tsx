import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { useAppDispatch } from './app/hooks';

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    textAlign: "center" as const,
    backgroundColor: "#313338",
    overflow: "hidden",
  },
  header: {
    fontSize: "2em",
    color: "white",
  },
  appBody: {
    display: "flex",
    flex: 1,
  },
  appBackground: {
    backgroundColor: "#f0f0f0",
  }
};

function App() {
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div style={styles.app}>
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
