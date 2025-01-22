import Navbar from "./section-components/Navbar"
import './App.css'
import Leftbar from "./section-components/Leftbar"

const App = () => {
  return (
    <div className="">
      <Navbar/>
      <main className="bg-gray-300 py-4 min-h-screen flex justify-center">
        <Leftbar/>
        

      </main>
    </div>
  )
}

export default App
