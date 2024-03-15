import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";

function handleAccept() {
    window.location.href = `/delivery_summary`;
  }

function Delivery_data() {
	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Doručovací údaje | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
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
