import Navbar from "./section-components/Navbar";
import './App.css';
import Leftbar from "./section-components/Leftbar";
import { useEffect, useState } from "react";
import Newsfeed from "./section-components/Newsfeed";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Rightbar from "./section-components/Rightbar";
import NewAccountDetailForm from "./section-components/NewAccountDetailForm";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { user,dbUser } = useAuth();
  const [hide,setHide] = useState(false)
  const navigate = useNavigate();

  const isData = async()=>{

    if(dbUser && dbUser.fullName == ''){
        setHide(true)
        
    }else{
        setHide(false)
    }
  }

  useEffect(()=>{
    const isUserDetails = async()=>{
        await isData();
    }
    isUserDetails()
    

  },[dbUser])

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, []); 

  if (loading) {
    return (
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </h1>
    );
  }


  return (
    <div className="">
      <Navbar/>
      <main className="bg-gray-300 py-4 min-h-screen flex justify-center gap-[2vw] relative top-[10vh]">
        <Leftbar/>    
        <Newsfeed/>
        <div className="hidden lg:block">
          <Rightbar/>
        </div>
        <div className={`${!hide && 'hidden'}`}>
          <NewAccountDetailForm setHide={()=>setHide(false)}/>
        </div>
      </main>
    </div>
  );
};

export default App;
