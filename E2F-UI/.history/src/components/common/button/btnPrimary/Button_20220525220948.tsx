import "./Button.scss";
type Props = {
  title: string;
  type?: "primary" | "secondary";
  onClick?: () => void;
};
const Button = ({ title, type = "primary", onClick }: Props) => {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
