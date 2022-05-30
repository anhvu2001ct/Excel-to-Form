import "./Button.scss";
type Props = {
  title: string;
};
const Button = ({ title }: Props) => {
  return <button className="button">{title}</button>;
};

export default Button;
