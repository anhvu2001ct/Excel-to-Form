type Props = {
  title: string;
  icon: string;
  position: "left" | "right";
};

const NavigateItem = ({ title, icon, position }: Props) => {
  return (
    <>
      {position === "left" ?()}
      <div className="navigate-item">
        <span className="navigate-item-icon">
          <i className="fal fa-file-import"></i>
        </span>
        <span className="navigate-item-text">Import</span>
      </div>
      <div className="navigate-item">
        <span className="navigate-item-text">{title}</span>
        <span className="navigate-item-icon">
          <i className={`fal fa-${icon}`}></i>
        </span>
      </div>
    </>
  );
};

export default NavigateItem;
