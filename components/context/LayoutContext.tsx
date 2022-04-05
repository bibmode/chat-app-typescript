import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type LayoutContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LayoutContext = createContext({} as LayoutContextType);

const LayoutContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{ loading, setLoading }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
