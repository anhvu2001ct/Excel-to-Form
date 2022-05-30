import "./ButtonCheck.scss";
type Props = {
  title: string;
};
const ButtonCheck = ({ title }: Props) => {
  return <button className="btn-check">{title}</button>;
};

export default ButtonCheck;
