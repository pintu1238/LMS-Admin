'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'admin@gmail.com' && password === 'admin123') {
      router.push('/dashboard');
    } else {
      setError('Invalid Credentials');
    }
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow w-25">
        <h2 className="mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
