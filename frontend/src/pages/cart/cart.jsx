import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Cart() {
	return (
		<>
			<Navbar />
			<div className="divcart">
				<div className="cartitems">
					<img className="" src="./logo.png"></img>
					<p>Název produktu</p>
					<p>
						množství <input type="number"></input>
					</p>
					<p>Cena: 150,- kč/ks</p>
				</div>
				<div className="cartitems">
					<img className="" src="./logo.png"></img>
					<p>Název produktu2</p>
					<p>
						množství <input type="number"></input>
					</p>
					<p>Cena: 1340,- kč/ks</p>
				</div>
				<div className="cartitems">
					<img className="" src="./logo.png"></img>
					<p>Název produktu23</p>
					<p>
						množství <input type="number"></input>
					</p>
					<p>Cena: 140,- kč/ks</p>
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
