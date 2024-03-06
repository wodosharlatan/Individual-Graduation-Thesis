import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Information() {
	return (
		<>
			<Navbar />

			<h1 className="infonadpis">Informace</h1>
			<div className="divinfo">
				<a>
					Ahoj, jmenuji se Bára a jsem z malé vesnice v Krkonoších. Propadla jsem
					pedigovému šílenství. Nejprve se to stal jen koníček po večerech a teď
					už je to moje práce. Ráda zkouším nové věci tak mě můžete kontaktovat s novými návrhy.
				</a>
			</div>

			<Footer />
		</>
	);
}

export default Information;
