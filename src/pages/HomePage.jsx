import "../App.css";
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="App">
      <h1> Green(ur)house </h1>
      <Link to="/plants"> See all plants </Link>
      <br/>
      <Link to="/dashboard"> See your plants and stuff </Link>
    </div>
  );
}

export default HomePage;
