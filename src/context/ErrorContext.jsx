import React, {createContext, useContext} from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = React.useState(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};


export const useErrorMessage = () => {
  return useContext(ErrorContext);
}