import NavigateItem from "./NavigateItem";

const navigateItems = [
  {
    title: "Import",
    icon: "file-import",
  },
];
const NavigateBottom = () => {
  return <div className="navigate-bottom">
    {navigateItems.map(item => (
      <NavigateItem title={title} ></NavigateItem>
    ))}
  </div>;
};

export default NavigateBottom;
