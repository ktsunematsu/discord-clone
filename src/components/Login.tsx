import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import styled from '@emotion/styled';

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background-color: #36393f;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .loginLogo {
    img {
      width: 150px;
    }
  }

  button {
    background-color: #7289da;
    color: white;
    font-weight: bold;
    
    &:hover {
      background-color: #677bc4;
    }
  }
`;

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <LoginContainer>
      <LoginContent>
        <div className="loginLogo">
          <img src="./discord.png" alt="" />
        </div>
        <Button onClick={signIn}>Googleでサインイン</Button>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;