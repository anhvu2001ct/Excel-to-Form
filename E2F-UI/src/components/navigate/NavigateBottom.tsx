import NavigateItem from "./NavigateItem";

const navigateItems = [
  {
    title: "Import",
    icon: "file-import",
    input: "file",
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
          input="file"
        />
      ))}
    </div>
  );
};

export default NavigateBottom;
