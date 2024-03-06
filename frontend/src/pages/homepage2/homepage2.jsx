import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";



function HomePage2() {
	return (
		<>
			<Navbar />

			<div className="divslideshow">
				<div>
					<img className="slidepic" src="ceska-posta.svg"></img>
				</div>
                <div>
					<img className="slidepic" src="ceska-posta.svg"></img>
				</div>
                <div>
					<img className="slidepic" src="ceska-posta.svg"></img>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default HomePage2;
