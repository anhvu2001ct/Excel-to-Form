import "./Separator.scss";
type Props = {
  title: string;
};
export default function Separator({ title }: Props) {
  return <div className="break">{title}</div>;
}
