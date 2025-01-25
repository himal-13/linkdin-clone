import { FaLinkedin } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/Firebase"

interface FormData{
    email:string,
    password:string
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
      });

    const[loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const[mode,setMode] = useState<'login' | 'signup'>('login')
    const[errorSubmit,setErrorSubmit] = useState('')


    const{user} = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        setErrorSubmit('')
      };

      const fetchUser = async () => {
        if (user) {
          navigate("/");
        } else {
          setLoading(false);
        }
      }

      useEffect(() => {
  ;
    
        fetchUser();
      }, [user, navigate]);
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!formData.password.trim() || !formData.email.trim()) {
          setErrorSubmit("Please fill both input fields");
          return;
        }
    
        setLoading(true);
        setErrorSubmit('');
    
        try {
          if (mode === "login") {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
          } else {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          }
        } catch (error: any) {
          console.log(`Error message: ${error.message}`);
          setErrorSubmit("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    const changeMode =()=>{
        setFormData({email:'',password:''})
        setErrorSubmit('')
        if(mode=='login'){
            setMode('signup')
        }else{
            setMode('login')
        }
    }
    
 


  return (
    
    <div className="h-screen max-w-full bg-gray-300 login">
        <div className="absolute top-4 left-4 text-blue-700 text-3xl font-extrabold flex items-center logo">
            <span>Linked</span>
            <FaLinkedin className="text-4xl"/>
        </div>
        {!loading?(
    <div className="sm:scale-105 scale-90 p-8 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md ">
        <h3 className="text-4xl font-bold ">{mode==='login'?"Sign in":'Signup'}</h3>
        <h5 className="text-[13px]">{mode==='login'?'Stay updated on your professional world.':"Make the most of your professional life."}</h5>
        <p className="text-[12px] bg-red-700  text-white">{errorSubmit}</p>
        <form className="my-3 flex flex-col" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={formData.email} name="email" className="text-2xl border-[1px] border-black p-3 mb-3" placeholder="Email" />
            <input type="password" onChange={handleChange} value={formData.password} name="password" className="text-2xl border-[1px] border-black p-3 mb-3" placeholder="Password" />
            <div className="">
                <input type="checkbox" className="scale-150 mr-2" />
                <span>Keep me logged in</span>
            </div>
            <button type="submit"  className="text-xl py-4 my-2 rounded-3xl text-white font-bold w-3/4 self-center bg-blue-700 hover:bg-blue-800">{mode==='login'?'Login':"Join"}</button>
            <h5 className="self-center">Or</h5>

            <p className="self-center mt-3">{mode==='login'?"Don't have an acoount?":"Already have an account?"} <span className="cursor-pointer" onClick={changeMode}>{mode=='login'?'Join':'Sign in.'}</span></p>

        </form>
    </div>):(
        <h1 className="text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h1>
    )}
    </div>
  )
}

export default Login
