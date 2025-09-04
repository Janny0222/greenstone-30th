import React from 'react'
import MainModal from './MainModal'
import { Input } from '../ui/UserInput'
import { IoClose } from "react-icons/io5";
import { addGuest } from '../../services/guestListServices';

const AddGuestModal = ({modalOpen, setModalOpen}) => {
    const [formData, setFormData] = React.useState({
        name: "",
        company: "",
    })
    const [error, setError] = React.useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const registeredGuest = addGuest(formData);
            if(registeredGuest.error){
                setError(registeredGuest)
            } else {
                setError(null)
                setFormData({})
                setModalOpen(false)
                window.location.reload();
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
    const handleCloseModal = () => {
        setModalOpen(false);
        setFormData({});
        setError(null);
    }

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block transitions sm:w-2/4 border shadow-xl relative rounded-2xl md:w-2/5 lg:w-2/6 w-full h-full align-middle">
        <form
          onSubmit={handleSubmit}
          className={`w-full gap-4  px-6 py-10 grid grid-cols-6  bg-green-700 rounded-lg border border-border text-left`}
        >
          <div className="col-span-6">
            <h1 className="text-3xl text-white font-bold"> GUEST REGISTRATION</h1>
          </div>
          
          <div className="col-span-6">
            <Input
              name="name"
              onChange={handleChange}
              label="Full Name"
              placeholder="Enter Guest Full Name"
              type="text"
              value={formData?.name || ""}
              bg={true}
            />
          </div>
          <div className="col-span-6">
            <Input
              name="company"
              onChange={handleChange}
              label="Company"
              placeholder="Enter Company"
              type="text"
              value={formData?.company || ""}
              bg={true}
            />
          </div>

          {error && (
            <p className="text-red-500">{error.error || "An error occurred"}</p>
          )}
          <button
            type="submit"
            className="bg-white col-span-6 transitions hover:bg-opacity-80 border font-bold border-black flex-rows gap-4 text-green-800 p-4 rounded-md w-full"
          >
             Add Guest
          </button>
          <div className="absolute right-4 top-4">
            <button
              onClick={handleCloseModal}
              tabIndex={0}
              type="button"
              className="w-7 h-7 flex items-center justify-center text-xl transitions  font-extrabold text-black bg-white border rounded-full hover:bg-dry"
            >
              <IoClose />
            </button>
          </div>
        </form>
        </div>
    </MainModal>
    
  )
}

export default AddGuestModal