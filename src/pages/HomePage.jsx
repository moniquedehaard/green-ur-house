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
          <br/>
          <p> Linda Solegato</p>

          <div style={{
            width: '550px', margin: '150px 0 0 100px'}}>
            <p
              style={{
                fontSize: '30px',
                fontWeight: '300',
                fontStyle: "italic"
              }}> green(ur)house is about plants, learning the different species, collect your own homeplants and know the right way to take care of them. </p>
          </div>
        </div>
      </div>
    
      <div className="homepage_right">
        {/* <div style={{width:'100%', height:'100%'}}>
          
        </div>   */}
      </div>
    </div>
  );
}

export default HomePage;
