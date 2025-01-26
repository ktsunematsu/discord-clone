import './App.scss';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
  
function App() {
  const user = null;

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
