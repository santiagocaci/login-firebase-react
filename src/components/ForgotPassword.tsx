import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, ValueContext } from '../context/AuthProvider';

export const ForgotPassword = () => {
  const { isLoading, setIsLoading, resetPassword }: ValueContext = useAuth()!;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [outputMessage, setOutputMessage] = useState({
    message: '',
    isOk: true,
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.email.trim())
      return setOutputMessage({
        message: 'Please enter your email',
        isOk: false,
      });
    setIsLoading(true);
    try {
      await resetPassword(user.email);
      setOutputMessage({
        message: 'we sent you an email with a link to reset your password',
        isOk: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        const err = error as any;
        setOutputMessage({ message: err.code, isOk: false });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOutputMessage({ ...outputMessage, message: '' });
  }, [user.email]);

  return (
    <div className=' w-full max-w-lg m-auto text-white flex flex-col justify-center items-center '>
      <form
        onSubmit={handleResetPassword}
        className='relative w-11/12  flex flex-col gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 rounded-lg md:p-8'
      >
        {outputMessage.message && (
          <p
            className={`absolute px-2 py-1 rounded font-medium  text-lg -top-1/4 left-1/4 ${
              outputMessage.isOk ? 'bg-green-700' : 'bg-red-600'
            }`}
          >
            {outputMessage.message}
          </p>
        )}
        <h1 className='text-center font-bold text-4xl'>Recover password</h1>
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
        <div className='px-4 flex justify-between items-center'>
          <button
            type='submit'
            className='w-min px-3 py-1.5 rounded-sm text-lg font-semibold bg-gray-100 text-black self-end disabled:opacity-50'
            disabled={isLoading}
          >
            Send
          </button>
          <Link to={'/..'} className='border-b-2'>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
