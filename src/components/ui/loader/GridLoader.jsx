import React, { useEffect } from "react";
import MainModal from "../../modals/MainModal";
import { GridLoader } from "react-spinners";
import { useErrorMessage } from "../../../context/ErrorContext";

const GridLoaders = ({
  modalOpen,
  status,
  result,
  handleGoBack,
}) => {
  const {errorMessage} = useErrorMessage();
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        handleGoBack();
      }, 1000);

      return () => clearTimeout(timer);
    } else if (status === "error") {
      const timer = setTimeout(() => {
        handleGoBack();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, handleGoBack]);


  return (
    <MainModal modalOpen={modalOpen} setModalOpen={handleGoBack}>
      <div className="inline-block bg-white transitions sm:w-2/4 border shadow-xl relative rounded-2xl md:w-2/5 lg:w-2/6 w-full h-full mb-40 align-middle">
        <div className="flex flex-col justify-center items-center gap-4 p-10">
          {status === "loading" && (
            <>
              <GridLoader size={20} margin={2} color={"#22c55e"} loading />
              <h1 className="text-gray-600">Verifying... Please wait...</h1>
            </>
          )}

          {status === "success" && (
            <>
              <span className="text-green-500 font-bold">
                Welcome!{" "}
                <span className="text-green-500 text-xl font-bold">
                  {result}
                </span>
              </span>
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
                Verification Successful!
              </h1>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="text-xl font-bold text-red-600">
                { errorMessage }
              </h1>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                onClick={handleGoBack}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </MainModal>
  );
};

export default GridLoaders;
