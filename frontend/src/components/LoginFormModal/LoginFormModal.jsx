import './LoginFormModal.css';
import { useState } from 'react';
import { login } from '../../store/sessionSlice';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { IoIosCloseCircle } from 'react-icons/io';

export default function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});

    return dispatch(login({ credential, password }))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();

        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  const demoLogin = e => {
    e.stopPropagation();

    const demoCredential = 'DemoUser';
    const demoPassword = 'password123asdf';

    return dispatch(login({ credential: demoCredential, password: demoPassword}))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();

        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  return (
    <>
      <span
        onClick={closeModal}
        id='close-button'
      >
        <IoIosCloseCircle />
      </span>

      <div id='login-container'>
        <h1 id='login-header'>Log In</h1>

        <form
          id='login-form'
          onSubmit={handleSubmit}
        >
          <label className='login-label'>
            Username or Email
            <input
              className='login-input'
              type='text'
              value={credential}
              onChange={e => setCredential(e.target.value)}
            />
          </label>

          <label className='login-label'>
            Password
            <input
              className='login-input'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <div className='error'>
            {errors.message && errors.message === 'Invalid credentials' && <p>{errors.message}</p>}
          </div>

          <div className='button-container'>
            <button
              id='login-button'
              type='submit'
              disabled={credential.length < 4 || password.length < 6}
            >
              Log In
            </button>

            <button
              onClick={demoLogin}
              id='demo-login'
            >
              Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
