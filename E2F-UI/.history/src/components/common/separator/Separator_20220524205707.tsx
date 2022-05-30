import "./Separator.scss";
type Props = {
  title: string;
};
export default function Separator({ title }: Props) {
  return (
    <div className="separator">
      <span></span>
      <div className="separator-text">{title}</div>
    </div>
  );
}
