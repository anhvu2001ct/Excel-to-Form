import "./LoadingCircle.scss";
type Props = {
  text?: string;
};

export default function LoadingCircle(props: Props) {
  return (
    <div className="overlay-loading">
      <div className="circle-loading2">
        <div></div>
        <div></div>
        <p></p>
      </div>
    </div>
  );
}
