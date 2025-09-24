import React from 'react'
import { Input, Select } from './ui/UserInput'
import { addGuest } from '../services/guestListServices'
import BeatLoaders from './ui/loader/BeatLoader'
import { QRCodeGenerator } from './QRCodeGenerator'

const RegistrationComponent = () => {
  const [formData, setFormData] = React.useState({
          name: "",
          company: "",
          userType: ""
      })
  const [guestData, setGuestData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [status, setStatus] = React.useState("loading"); // loading | success

  const handleSubmit = (e) => {
      e.preventDefault();
      try {
          const registeredGuest = addGuest(formData);
          
          if(registeredGuest.error){
              setError(registeredGuest)
              setStatus("loading")
          } else {
              registeredGuest.then(data => setGuestData(data))
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
    <BeatLoaders modalOpen={modalOpen} setModalOpen={setModalOpen} guestData={guestData} setStatus={setStatus} status={status} />
    <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="bg-green-800 text-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo192.png" alt="Logo" className="h-10 w-10"/>
              <span className="font-extrabold text-lg">Greenstone 30th</span>
            </div>
          </div>
        </header>
        {status === "loading" &&  
          <main className="flex justify-center items-center flex-col mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">You are cordially invited to the 30th Anniversary of Greenstone</h1>
            {/* Registration form or content goes here */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="text" onChange={handleChange} name="name" label="Name" placeholder="Enter your name" />
                  <Input type="text" onChange={handleChange} name="company" label="Company" placeholder="Enter your company" />
                  <Select options={["Guest", "Employee"]} value={formData.userType} onChange={handleChange} name="userType" label="Guest or Employee ?" />
                  <button
                    type="submit"
                    className="bg-green-800 col-span-6 transitions hover:bg-opacity-80 border font-bold border-black flex-rows gap-4 text-white
                    p-4 rounded-md w-full"
                  >
                    REGISTER
                  </button>
              </form>
              {error && <p className="text-red-500 mt-2">{error.error}</p>}
            </div>
          </main>
        }
        {status === "success" && (
            <div className="flex justify-center items-center flex-col mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <h1 className="text-xl font-bold text-green-600">
                Registration Successful!
              </h1>
              <div className='mt-4 p-4 bg-white rounded-lg shadow-md'>
                
                <QRCodeGenerator data={guestData.name} />
              </div>
              <span className='font-bold text-center mt-2'>Please show this QR Code at the event entrance.</span>
            </div>
          )}
      </div>
    </>
  )
}

export default RegistrationComponent