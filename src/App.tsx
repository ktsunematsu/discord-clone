import './App.scss';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

function App() {
  const user = useAppSelector((state: RootState) => state.user.user);
  console.log(user);

  return (
    <div className="App">
      {user ? (
        <>
          {/* sidebar */}
            {/* <Suspense fallback={<div>...Loading</div>}> */}
            <Sidebar />
            {/* </Suspense> */}
          {/* home */}
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
