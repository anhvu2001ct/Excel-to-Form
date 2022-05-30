import "./Button.scss";
type Props = {
  title: string;
  type: "primary" | "secondary";
};
const Button = ({ title }: Props) => {
  return <button className={`btn`}>{title}</button>;
};

export default Button;
