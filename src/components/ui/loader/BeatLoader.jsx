import React, { useEffect } from "react";
import MainModal from "../../modals/MainModal";
import { BeatLoader } from "react-spinners";

const BeatLoaders = ({ modalOpen, setModalOpen, guestData, setStatus, status }) => {
  
  useEffect(() => {
    if (guestData?._id) {
      const timer = setTimeout(() => {
        setModalOpen(false);
        setStatus("success");
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
              <BeatLoader size={20} margin={2} color={"#22c55e"} loading />
              <h1 className="text-gray-600">Please wait...</h1>
            </>
          )}

          {status === "success" && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-green-500 animate-bounce"
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
            </>
          )}
        </div>
      </div>
    </MainModal>
  );
};

export default BeatLoaders;
