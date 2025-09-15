import React, { useEffect } from 'react'
import MainModal from '../../modals/MainModal'
import { GridLoader } from 'react-spinners'

const GridLoaders = ({ modalOpen, setModalOpen, guestData, setStatus, status }) => {
    useEffect(() => {
    if (guestData?._id) {
        setStatus("success");
      const timer = setTimeout(() => {
        setModalOpen(false);
        setStatus("loading");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [guestData, setModalOpen, setStatus]);

console.log(guestData)
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block bg-white transitions sm:w-2/4 border shadow-xl relative rounded-2xl md:w-2/5 lg:w-2/6 w-full h-full align-middle">
        <div className="flex flex-col justify-center items-center gap-4 p-10">
          {status === "loading" && (
            <>
              <GridLoader size={20} margin={2} color={"#22c55e"} loading />
              <h1 className="text-gray-600 ">Verifying...Please wait...</h1>
            </>
          )}   
        </div>
      </div>
    </MainModal>
  )
}

export default GridLoaders