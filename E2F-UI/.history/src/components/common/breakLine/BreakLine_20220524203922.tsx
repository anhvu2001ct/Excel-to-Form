import "./BreakLine.scss";
type Props = {
  title: string;
};
export default function BreakLine({title}) {
  return <div className="break">{title}</div>;
}
