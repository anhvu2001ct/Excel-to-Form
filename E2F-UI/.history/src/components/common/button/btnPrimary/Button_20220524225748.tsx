import "./Button.scss";
type Props = {
  title: string;
};
const Button = ({ title }: Props) => {
  return <button className={`btn`}></button>;
};

export default Button;
