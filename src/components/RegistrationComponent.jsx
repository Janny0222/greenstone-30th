import { Leaf } from 'lucide-react'
import React from 'react'
import { Input } from './ui/UserInput'
import { addGuest } from '../services/guestListServices'
import BeatLoaders from './ui/loader/BeatLoader'

const RegistrationComponent = () => {
  const [formData, setFormData] = React.useState({
          name: "",
          company: "",
      })
  const [error, setError] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleSubmit = (e) => {
      e.preventDefault();
      try {
          const registeredGuest = addGuest(formData);
          if(registeredGuest.error){
              setError(registeredGuest)
          } else {
              setModalOpen(true)
              setFormData({})
          }
      } catch (error) {
          setError({error: "An error occurred. Please try again."})
      }
      
  }
  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
  return (
    <>
    <BeatLoaders modalOpen={modalOpen} setModalOpen={setModalOpen} />
    <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="bg-green-800 text-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-emerald-300" />
              <span className="font-extrabold text-lg">Greenstone 30th</span>
            </div>
          </div>
        </header>
        <main className="flex justify-center items-center flex-col mt-10">
          <h1 className="text-2xl font-bold mb-4 text-center">You are invited to our 30th Anniversary</h1>
          {/* Registration form or content goes here */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="text" onChange={handleChange} name="name" label="Name" placeholder="Enter your name" />
                <Input type="text" onChange={handleChange} name="company" label="Company" placeholder="Enter your company" />
                <button
                  type="submit"
                  className="bg-green-800 col-span-6 transitions hover:bg-opacity-80 border font-bold border-black flex-rows gap-4 text-white
                   p-4 rounded-md w-full"
                >
                  REGISTER
                </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default RegistrationComponent