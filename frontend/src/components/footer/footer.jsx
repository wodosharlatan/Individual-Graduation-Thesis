import "./_footer.scss";

function Footer() {
	return (
		<footer className="divfoot">
			<div className="contacts">
				<h2>Kontakty</h2>
				<p>+420 123 648 273</p>
				<p>info@darkyzpedigu.cz</p>
				<a className="linksoc" href="https://www.instagram.com/"><i className="uil uil-instagram"></i></a>
				<a className="linksoc" href="https://www.facebook.com/groups/442086279211061/"><i className="uil uil-facebook-f"></i></a>
			</div>
			<div className="delivery_payment">
				<h2>Možnosti dopravy</h2>
				<img className="dopravaimgcz" src="ceska-posta.svg"></img>
				<img className="dopravaimg" src="ppl.svg"></img>
				<img className="dopravaimg" src="zasilkovna.svg"></img>
			</div>

			<div className="about">
			<h2>O Nás</h2>
			<a className="info" href="/information">Informace</a>
			</div>
		</footer>
		
	);
}

export default Footer;
