import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "../../../loading/Spinner";
import "./Button.scss";
interface IProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "third";
  isFormSubmit?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}
const Button = ({
  children,
  type = "primary",
  isFormSubmit = false,
  onClick,
  ...props
}: IProps) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Spinner /> : children;
  return (
    <button
      type={isFormSubmit ? "submit" : "button"}
      className={`btn btn-${type}`}
      disabled={isLoading}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
