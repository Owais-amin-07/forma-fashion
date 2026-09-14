import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const { login } = useAuth(); const nav = useNavigate(); const [err,setErr]=useState('');
  const submit = async (e)=>{
    e.preventDefault(); setErr('');
    try{ await login(email,password); nav('/'); }catch(e){ setErr(e.response?.data?.message||'Login failed'); }
  };
  return (
    <div className="max-w-[440px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[30px] text-center">Welcome back</h1>
      <p className="text-center text-[12px] tracking-widest uppercase text-[#8a8885] mt-2">Forma Fashion Account</p>
      <form onSubmit={submit} className="mt-10 space-y-4">
        {err && <p className="bg-red-50 text-red-600 text-[12px] p-3">{err}</p>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email or username" type="text" required minLength={2} className="w-full border border-[#ece9e3] px-4 py-3.5 text-[13px] outline-none focus:border-black bg-white" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (min 6 characters)" type="password" required minLength={6} className="w-full border border-[#ece9e3] px-4 py-3.5 text-[13px] outline-none focus:border-black bg-white" />
        <button className="w-full btn-primary">Login</button>
      </form>
      <p className="mt-8 text-center text-[12px]">No account? <Link to="/register" className="underline uppercase tracking-widest">Register</Link></p>
      <div className="mt-8 p-4 bg-[#f5f3ef] text-[11px] leading-5">
        <p className="font-medium uppercase tracking-widest mb-1">Quick entry:</p>
        <p>Use any Gmail address, username, or test name with a password of 6 or more characters. New customers are created automatically.</p>
      </div>
    </div>
  )
}
