import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Table from "../../components/table/Table"

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listTitle">Latest Scan</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
