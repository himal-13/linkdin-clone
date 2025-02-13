import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdClose } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";

const EditMyProfilePop = ({closeMenu}:{closeMenu:()=>void}) => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [study, setStudy] = useState('');
  const [work, setWork] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const{dbUser,fetchdbUser} = useAuth()

  const loadInitialData = () => {
    if(dbUser){
      setFullName(dbUser.fullName)
      setBio(dbUser.userDetails.bio)
      setLocation(dbUser.userDetails.location)
      setStudy(dbUser.userDetails.study)
      setWork(dbUser.userDetails.work)
    }
  };

  useEffect(()=>{
    loadInitialData()
  },[dbUser])

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || !fullName.trim().includes(' ')) newErrors.fullName = 'valid name is required';
    if (!bio.trim()) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async () => {
    if (validateForm() && dbUser) {
        closeMenu()

        const userRef = doc(db,'users',dbUser.id)
        await updateDoc(userRef,{
            fullName:fullName,
            userDetails:{
                bio:bio,
                location:location,
                study:study,
                work:work
            }

        })
        fetchdbUser()
    }
  };

  return (
    <div className="fixed z-[1000] top-0 left-0 inset-0 bg-gray-800/85 h-screen w-screen flex justify-center items-center p-4">
      <main className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <section className="p-6">
            <div className="flex items-center justify-between p-2 mb-6 border-b-[1px] border-gray-200">
                <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
                <MdClose className="text-2xl cursor-pointer" onClick={()=>closeMenu()} />
            </div>
          <form className="space-y-6">
            <div className="space-y-4">
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="fullName"
                  className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 mt-1`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Bio</h3>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  About You
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  className={`w-full border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 mt-1 resize-none h-32`}
                  maxLength={100}
                  placeholder="Tell us about yourself..."
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  id="location"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label htmlFor="study" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <input
                  type="text"
                  value={study}
                  onChange={(e) => setStudy(e.target.value)}
                  id="study"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="University or Institution"
                />
              </div>

              <div>
                <label htmlFor="work" className="block text-sm font-medium text-gray-700">
                  Workplace
                </label>
                <input
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  id="work"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="Company or Organization"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default EditMyProfilePop;
