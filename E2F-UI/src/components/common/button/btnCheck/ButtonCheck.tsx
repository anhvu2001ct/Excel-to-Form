import { EventHandler } from "react";
import "./ButtonCheck.scss";
type Props = {
  title: string;
  onClick: () => void;
};
const ButtonCheck = ({ title, onClick }: Props) => {
  return (
    <button className="btn-check" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonCheck;
