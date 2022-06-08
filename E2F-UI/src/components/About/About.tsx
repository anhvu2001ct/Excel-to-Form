import "./about.css";
import imgvision from "../../data/img/vision.png";
import imgmission from "../../data/img/mission.png";
import imgvalue from "../../data/img/value.png";
export default function () {
  return (
    <>
      <h2 className="about-Us"> About Us</h2>
      <div className="about-container-2">
        <div className="about-left-2">
          <h3 className="about-title-2"> OUR VISION</h3>
          <img className="about-img2" src={imgmission} alt="mission" />
        </div>
        <div className="about-right-2">
          <ul className="square">
            <li>
              E2F always makes constant efforts to bring high quality products,
              stable and best products, with customer trust and cost
              effectiveness.
            </li>
            <li>
              Connect with customers and partners together on the basis of
              cooperation and development together
            </li>
          </ul>
        </div>
      </div>

      <div className="about-container">
        <div className="about-left">
          <h3 className="about-title">OUR MISSION</h3>
          <img className="about-img" src={imgvision} alt=" vision" />
        </div>
        <div className="about-right">
          <ul className="square">
            <li>
              Provide the market with high quality software products and
              information technology services.
            </li>
            <li>
              Develop and enhance the value of the company and customers, ready
              to accompany and share with the business.
            </li>
            <li>
              For customers: learn the business needs of customers, thereby
              offering a total software solution, making it easy for customers
              to use and convenient.
            </li>

            <li>Constantly improving and innovating, being creative at work</li>
          </ul>
        </div>
      </div>

      <div className="about-container-3">
        <div className="about-right-3">
          <h3 className="about-title-3"> OUR VALUE</h3>
          <img className="about-img3" src={imgvalue} alt="value" />
        </div>
        <div className="about-left-3">
          <ul className="square">
            <li>Simplify complex issues and maximize value for customers.</li>
            <li>
              Creativity: we constantly improve and foster good relationships
              with all customers.
            </li>
            <li>We adhere to professional ethical standards.</li>
            <li>
              Professional: our company has a professional system, a
              professional system of each individual to create success.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
