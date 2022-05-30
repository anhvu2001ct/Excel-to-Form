import "./ButtonCheck.scss";
type Props = {
  title: string;
  onClick: (e: React.MouseEventHandler<HTMLButtonElement> | undefined) => void;
};
const ButtonCheck = ({ title, onClick }: Props) => {
  return (
    <button className="btn-check" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonCheck;
