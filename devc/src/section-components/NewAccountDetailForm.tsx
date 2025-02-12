import { doc, updateDoc } from "firebase/firestore";
import {  useState } from "react";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { db } from "../services/Firebase";
import { useAuth } from "../context/AuthContext";

interface useDetailsType{
    bio:string,
    location:string,
    study:string,
    work:string
}

const NewAccountDetailForm = ({setHide}:{setHide:()=>void}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [study, setStudy] = useState('');
  const [work, setWork] = useState('');
  const[autoFill,setAutoFill] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({});
  const{dbUser} = useAuth()

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || !fullName.trim().includes(' ')) newErrors.fullName = 'valid name is required';
    if (!bio.trim()) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleAutoFill = () => {
    setAutoFill(!autoFill)
    if(autoFill){
      setLocation('California, USA')
      setStudy('Harvard University')
      setWork('Microsoft')
    }else{
        setLocation('')
        setStudy('')
        setWork('')
    }
  }

  const handleSubmit = async() => {
    if(dbUser && validateStep1() && location.trim() && study.trim() && work.trim()){
        try{
            await updateDoc(doc(db,'users',dbUser.id),{
            fullName:fullName,
            userDetails:{
                bio:bio,
                location:location,
                study:study,
                work:work
            }as useDetailsType
            })
        }catch(e){
            console.log('error updating user details',e)
        }finally{
            setHide()
        }

    }
  };

  return (
    <div className={`fixed z-[1000] top-0 left-0 inset-0 bg-gray-800/85 h-screen w-screen justify-center items-center flex`}>
      <main className="p-4 bg-white rounded-lg shadow-lg ">
        <section className="w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Create New Account</h2>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
            >
              {/* Step 1 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600">
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

                <div className="mb-6">
                  <label htmlFor="bio" className="block text-sm font-semibold text-gray-600">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    id="bio"
                    className={`w-full border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 mt-1 resize-none h-24`}
                    maxLength={100}
                    placeholder="Tell us about yourself"
                  />
                  {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 float-end bg-blue-500 text-white font-semibold text-sm py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>

              {/* Step 2 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="flex gap-1 items-center cursor-pointer float-end" onClick={handleAutoFill}>
                   {autoFill?<MdOutlineCheckBoxOutlineBlank className="text-2xl" />:<MdOutlineCheckBox className="text-2xl"/>}
                    <span>Auth fill</span>
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-600">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                    placeholder="California, USA"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="study" className="block text-sm font-semibold text-gray-600">
                    Education
                  </label>
                  <input
                    type="text"
                    value={study}
                    onChange={(e) => setStudy(e.target.value)}
                    id="study"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                    placeholder="Harvard University"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="work" className="block text-sm font-semibold text-gray-600">
                    Work
                  </label>
                  <input
                    type="text"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    id="work"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                    placeholder="Microsoft"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold text-sm py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-500 text-white font-semibold text-sm py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewAccountDetailForm;
