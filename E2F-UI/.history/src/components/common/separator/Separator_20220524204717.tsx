import "./Separator.scss";
type Props = {
  title: string;
};
export default function BreakLine({ title }: Props) {
  return <div className="break">{title}</div>;
}
