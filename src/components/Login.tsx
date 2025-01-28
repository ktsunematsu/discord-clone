import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/userSlice";
import "./Login.scss";

const Login = () => {
  const dispatch = useAppDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            uid: result.user.uid,
            photo: result.user.photoURL,
            email: result.user.email,
            displayName: result.user.displayName,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      {/* <h2>ログインページです。</h2> */}

      <div className="loginLogo">
        <img src="./discord.png" alt="" />
      </div>

      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;