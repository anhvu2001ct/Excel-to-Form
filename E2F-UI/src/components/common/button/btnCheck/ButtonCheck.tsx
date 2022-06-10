import { ReactNode } from "react";
import Spinner from "../../../loading/Spinner";
import "./ButtonCheck.scss";
type Props = {
  children: ReactNode;
  isFormSubmit?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};
const ButtonCheck = ({ children, onClick, isFormSubmit, ...props }: Props) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Spinner /> : children;
  return (
    <button className="btn-check" disabled={isLoading} onClick={onClick}>
      {child}
    </button>
  );
};

export default ButtonCheck;
