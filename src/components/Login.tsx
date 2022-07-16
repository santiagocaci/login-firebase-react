import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, ValueContext } from '../context/AuthProvider';

export const Login = () => {
  const { login, isLoading, setIsLoading }: ValueContext = useAuth()!;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');
    try {
      await login(user.email, user.password);
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        // err: {code, message}
        const err = error as any;
        setErrorMessage(err.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative w-full h-full flex flex-col justify-center items-center text-white'>
      {errorMessage && (
        <p className='absolute bg-red-500 px-2 py-4 rounded font-semibold text-lg top-3/4'>
          {errorMessage}
        </p>
      )}
      <div className='max-w-xl w-11/12'>
        <form
          onSubmit={handleSubmitForm}
          className='mx-auto flex flex-col gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 rounded-lg md:p-8'
        >
          <h1 className='text-center font-bold text-4xl'>Login</h1>
          <div>
            <label htmlFor='email' className='text-xl block'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='youremail@example.com'
              onChange={handleChangeInput}
              className='w-full text-lg bg-transparent border-b-2 p-2  outline-none'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-xl'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='******'
              onChange={handleChangeInput}
              className='w-full text-lg bg-transparent border-b-2 p-2 outline-none tracking-widest'
            />
          </div>
          <div className='px-4 flex justify-between items-center'>
            <button
              type='submit'
              className='w-min px-3 py-1.5 rounded-sm text-lg font-semibold bg-gray-100 text-black self-end disabled:opacity-75'
              disabled={isLoading}
            >
              Submit
            </button>
            <Link to={'/forgot-password'} className='border-b-2'>
              Forgot Password?
            </Link>
          </div>
        </form>
        <Link
          to={'/register'}
          className='block border-b-2 w-min ml-auto mr-5 text-lg mt-2'
        >
          Register
        </Link>
      </div>
    </div>
  );
};
