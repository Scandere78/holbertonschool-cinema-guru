import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';

function Login({ username, password, setUsername, setPassword }) {
  return (
    <>
      <Input
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        className="auth-input"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        className="auth-input"
      />
      <Button
        label="Sign In"
        className="submit-btn"
        type="submit"
      />
    </>
  );
}

export default Login;
