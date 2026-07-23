"use client";

import { ThreeDots } from "react-loader-spinner";

interface IProps {
  className?: string;
}
const Loader = ({ className = "" }: IProps) => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#f59e0b"
      radius="9"
      wrapperClass={className}
    />
  );
};

export default Loader;
