import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function HomePage2() {
	return (
		<>
			<Navbar />

			<div id="slideshow">
				<div class="slide-wrapper">
					<div class="slide">
						<img className="imgslide" src="ceska-posta.svg"></img>
					</div>
					<div class="slide">
						<img className="imgslide" src="ceska-posta.svg"></img>
					</div>
					<div class="slide">
						<img className="imgslide" src="logo.png"></img>
					</div>
					<div class="slide">
						<img className="imgslide" src="ceska-posta.svg"></img>
					</div>
					<div class="slide">
						<img className="imgslide" src="ceska-posta.svg"></img>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default HomePage2;
