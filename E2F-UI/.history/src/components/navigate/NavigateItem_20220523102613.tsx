type Props = {
  title: string;
  icon: string;
  
}

const NavigateItem = (props) => {
  return (
    <>
      <div className="navigate-item">
        <span className="navigate-item-icon">
          <i className="fal fa-file-import"></i>
        </span>
        <span className="navigate-item-text">Import</span>
      </div>
      {/* <div className="navigate-item">
            <span className="navigate-item-text">{item.title}</span>
            <span className="navigate-item-icon">
              <i className={`fal fa-${item.icon}`}></i>
            </span>
          </div> */}
    </>
  );
};

export default NavigateItem;
