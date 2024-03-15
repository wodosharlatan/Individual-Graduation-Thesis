import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function handleAccept() {
    window.location.href = `/delivery_summary`;
  }

function Delivery_data() {
	return (
		<>
			<Navbar />

            <div>
                <a>Použít doruřovací údáje z uživatelského účtu</a>
            </div>






			<div onClick={() => {handleAccept();}} className="nextbtn">
				<p>Další</p>
			</div>

			<Footer />
		</>
	);
}

export default Delivery_data;
