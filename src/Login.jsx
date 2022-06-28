import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <form action="#" className="flex flex-col gap-4 p-20 rounded-xl bg-white shadow-md ">

    <label className="text-2xl text-left">Login</label>
        <label htmlFor="username" className="flex flex-col gap-2 ">
          Username
          <input
            type="text"
            required
            id="username"
            className="p-2 px-4 rounded-xl border shadow"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2 ">
          Password
          <input
            type="password"
            required
            id="username"
            className="p-2 px-4 rounded-xl border shadow"
          />
        </label>
        <button className="bg-blue-500 rounded-xl p-2 px-4 text-white">
          Login
        </button>
        <p className="text-slate-600 text-sm">Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
