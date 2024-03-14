import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";

function Information() {
	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Informace</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
			<Navbar />

			<h1 className="infonadpis">Informace</h1>
			<div className="divinfo">
				<a>
					Ahoj, jmenuji se Bára Eflerová a jsem z malé vesnice v Krkonoších. Propadla jsem
					pedigovému šílenství. Nejprve se to stal jen koníček po večerech a teď
					už je to moje práce. Ráda zkouším nové věci tak mě můžete kontaktovat s novými návrhy.
				</a>
				<br></br><br></br>
				<a>
				Huntířov 229 Vítězná 54401
				</a>
				<br></br><br></br>
				<a>
				​ičo: 05442788
				</a>
			</div>

			<Footer />
		</>
	);
}

export default Information;
