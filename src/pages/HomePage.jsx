import "../App.css";
import { Link } from 'react-router-dom'
import Header from "../components/Header/Header.jsx"
import "./styling.css"
function HomePage(props) {
  return (
    <div className="homepage">
      <div className="homepage_left">
        <Header user={props.user} />
        <div className="homepage_textBlock">
          <h1> "Plants give us oxygen for the lungs and the soul."</h1>
          <p> Linda Solegato</p>
        </div>
      </div>
    
      <div className="homepage_right">
        <div className="homepage_img">
          <img src="plants.jpg" alt="leafs.jpg"/>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
