import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";

function Delivery_option() {
	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Způsob doručení</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
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
