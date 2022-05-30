import React from "react";
type Props = {
  title: string;
};
const Button = ({ title }: Props) => {
  return <button>{title}</button>;
};

export default Button;
