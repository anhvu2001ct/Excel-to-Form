import NavigateItem from "./NavigateItem";

type NavItem = {
  title: string;
  icon: string;
  href?: string;
};

const navigateItems: NavItem[] = [
  {
    title: "Home",
    icon: "home",
    herf: ""
  },
  {
    title: "Dashboard",
    icon: "chart-line",
  },
  {
    title: "About",
    icon: "address-card",
  },
  {
    title: "Feedback",
    icon: "comment-alt",
  },
];
const NavigateMain = () => {
  return (
    <div className="navigate-main">
      {navigateItems.map((item) => {
        return (
          <NavigateItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            position={"right"}
          />
        );
      })}
    </div>
  );
};

export default NavigateMain;
