import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Delivery_option() {
	return (
		<>
			<Navbar />

			<h1 className="nadpis_del">Způsob doručení</h1>
			<hr></hr>

			<div className="delidiv">
				<div className="delidiv_item">
					<input type="checkbox" />
                    <img className="imgdelcz" src="ceska-posta.svg"></img>
					<a>Česká pošta - doručení na adresu</a>
				</div>
                <br></br>

				<div className="delidiv_item">
					<input type="checkbox" />
                    <img className="imgdel" src="ppl.svg"></img>
					<a>PPL - doručení na adresu</a>
				</div>
                <br></br>
				<div className="delidiv_item">
					<input type="checkbox" />
                    <img className="imgdel" src="zasilkovna.svg"></img>
					<a>Zásilkovna - doručení na výdejní místo</a>
				</div>
			</div>

			<div className="nextbtn">
				<p>Další</p>
			</div>

			<Footer />
		</>
	);
}

export default Delivery_option;
