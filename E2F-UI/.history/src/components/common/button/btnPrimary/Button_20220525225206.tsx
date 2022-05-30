import "./Button.scss";
type Props = {
  title: string;
  type?: "primary" | "secondary";
};
const Button = ({ title, type = "primary" }: Props) => {
  return <button className={`btn btn-${type}`}>{title}</button>;
};

export default Button;
