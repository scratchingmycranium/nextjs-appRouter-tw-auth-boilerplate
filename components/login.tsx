'use client';
import AuthAPI from '@/lib/api/authAPI';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const authAPI = AuthAPI.getInstance();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast()

  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !password) {
          setError('Email and password are required');
          return;
      }

      setError('');
      onLogin(email, password);
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password })
      console.log(response)

      router.push('/')
      router.refresh();
    } catch (error) {
      setError('An error occurred during login')
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>}
        <div className="flex items-center justify-center">
          <Button
            type="submit"
          >
            Login
          </Button>
        </div>
        <p className="text-center text-gray-600 text-xs mt-4">
          {`Don't have an account?`} <Link href="/signup"><span className="text-blue-500">Sign Up</span></Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
