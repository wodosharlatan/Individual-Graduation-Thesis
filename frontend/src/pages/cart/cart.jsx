import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Cart() {
	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Košík</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
			<Navbar />
			<div className="divcart">



				<div className="cartitems">
					<div className="cartimg">
						<img className="" src="./logo.png"></img>
					</div>
					<div className="cartname">
						<p>Název produktu</p>
					</div>
					<div className="cartquantity">
						<p>
						<input type="number" min={1}></input>
						</p>
							
					</div>

					<div className="cartdelete">
						<p>Odebrat</p>
					</div>
					<div className="cartprice">
						<p>Cena: 150,- kč/ks</p>
					</div>
				</div>

				
				<div className="cartitems">
					<div className="cartimg">
						<img className="" src="./logo.png"></img>
					</div>
					<div className="cartname">
						<p>Název produktu</p>
					</div>
					<div className="cartquantity">
						<p>
						<input type="number"></input>
						</p>
							
					</div>

					<div className="cartdelete">
						<p>Odebrat</p>
					</div>
					<div className="cartprice">
						<p>Cena: 150,- kč/ks</p>
					</div>
				</div>

				
				<div className="cartitems">
					<div className="cartimg">
						<img className="" src="./logo.png"></img>
					</div>
					<div className="cartname">
						<p>Název produktu</p>
					</div>
					<div className="cartquantity">
						<p>
						<input type="number"></input>
						</p>
							
					</div>

					<div className="cartdelete">
						<p>Odebrat</p>
					</div>
					<div className="cartprice">
						<p>Cena: 150,- kč/ks</p>
					</div>
				</div>

				
				<div className="cartitems">
					<div className="cartimg">
						<img className="" src="./logo.png"></img>
					</div>
					<div className="cartname">
						<p>Název produktu</p>
					</div>
					<div className="cartquantity">
						<p>
						<input type="number"></input>
						</p>
							
					</div>

					<div className="cartdelete">
						<p>Odebrat</p>
					</div>
					<div className="cartprice">
						<p>Cena: 150,- kč/ks</p>
					</div>
				</div>



				
				<div className="totalprice">
					<p>Celkem: 1432,- kč</p>
				</div>
			</div>

			<div className="nextbtn">
				<p>Další</p>
			</div>

			<Footer />
		</>
	);
}

export default Cart;
