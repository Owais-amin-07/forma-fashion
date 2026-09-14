import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const { register } = useAuth(); const nav = useNavigate(); const [err,setErr]=useState('');
  const submit = async (e)=>{
    e.preventDefault(); setErr('');
    try{ await register(name,email,password); nav('/'); }catch(e){ setErr(e.response?.data?.message||'Register failed'); }
  };
  return (
    <div className="max-w-[440px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[30px] text-center">Create account</h1>
      <p className="text-center text-[12px] tracking-widest uppercase text-[#8a8885] mt-2">Join Forma Fashion</p>
      <form onSubmit={submit} className="mt-10 space-y-4">
        {err && <p className="bg-red-50 text-red-600 text-[12px] p-3">{err}</p>}
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required className="w-full border border-[#ece9e3] px-4 py-3.5 text-[13px] outline-none focus:border-black bg-white" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full border border-[#ece9e3] px-4 py-3.5 text-[13px] outline-none focus:border-black bg-white" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (min 6)" type="password" required className="w-full border border-[#ece9e3] px-4 py-3.5 text-[13px] outline-none focus:border-black bg-white" />
        <button className="w-full btn-primary">Create Account</button>
      </form>
      <p className="mt-8 text-center text-[12px]">Have account? <Link to="/login" className="underline uppercase tracking-widest">Login</Link></p>
    </div>
  )
}
