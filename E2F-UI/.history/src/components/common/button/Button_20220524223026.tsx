import "./Button.scss";
type Props = {
  title: string;
};
const Button = ({ title }: Props) => {
  return <button className="btn btn-primary">{title}</button>;
};

export default Button;
