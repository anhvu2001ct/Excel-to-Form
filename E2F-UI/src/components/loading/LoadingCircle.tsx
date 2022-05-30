import "./LoadingCircle.scss";
type Props = {
  text?: string;
};

export default function LoadingCircle({ text }: Props) {
  return (
    <div className="overlay-loading">
      <div className="overlay"></div>
      <div className="circle-loading2">
        <div></div>
        <div></div>
      </div>
      <p>{text}</p>
    </div>
  );
}
