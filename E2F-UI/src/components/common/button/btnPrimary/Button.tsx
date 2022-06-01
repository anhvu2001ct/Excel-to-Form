import "./Button.scss";
type Props = {
  title: string;
  type?: "primary" | "secondary" | "third";
  isFormSubmit?: boolean;
  onClick?: () => void;
};
const Button = ({
  title,
  type = "primary",
  isFormSubmit = false,
  onClick,
}: Props) => {
  return (
    <button
      type={isFormSubmit ? "submit" : "button"}
      className={`btn btn-${type}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
