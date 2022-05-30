import "./Button.scss";
type Props = {
  title: string;
};
const Button = ({ title }: Props) => {
  return <button className="btn-check">{title}</button>;
};

export default Button;
