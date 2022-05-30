import NavigateItem from "./NavigateItem";

const navigateItems = [
  {
    title: "Import",
    icon: "file-import",
  },
];
const NavigateBottom = () => {
  return (
    <div className="navigate-bottom">
      {navigateItems.map((item) => (
        <NavigateItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          position={"left"}
        ></NavigateItem>
      ))}
    </div>
  );
};

export default NavigateBottom;
