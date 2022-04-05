import { Icon } from "@iconify/react";
import React, { useContext, useEffect } from "react";
import { LayoutContext } from "./context/LayoutContext";

type Props = {
  handleClick: () => void;
};

const RandomButton = ({ handleClick }: Props) => {
  const { loading } = useContext(LayoutContext);

  return (
    <button
      onClick={handleClick}
      className="absolute mt-4 flex items-center font-medium top-0 right-0 mr-4 px-4 py-2 hover:text-yellow-500"
    >
      random
      <Icon
        className={`ml-2 ${loading ? "animate-spin" : ""}`}
        icon="entypo:cycle"
      />
    </button>
  );
};

export default RandomButton;
