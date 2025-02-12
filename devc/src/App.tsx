import Navbar from "./section-components/Navbar";
import './App.css';
import Leftbar from "./section-components/Leftbar";
import { useEffect, useState } from "react";
import Newsfeed from "./section-components/Newsfeed";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Rightbar from "./section-components/Rightbar";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // Redirect to login if no user exists
      navigate('/login');
    } else if (user) {
      // User is authenticated, allow access
      setLoading(false);
    }
  }, [user, navigate]); // React to user state changes

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
      </main>
    </div>
  );
};

export default App;
