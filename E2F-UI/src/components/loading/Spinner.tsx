import "./Spinner.scss";
interface IProps {
  size?: string;
  borderSize?: string;
  className?: string;
}

const Spinner = ({ size = "25px", borderSize = "2px", className }: IProps) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: size,
        height: size,
        border: `${borderSize} solid white`,
        borderTop: `${borderSize} solid transparent`,
        borderBottom: `${borderSize} solid transparent`,
      }}
    ></div>
  );
};

export default Spinner;
