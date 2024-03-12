import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Cart() {
	return (
		<>
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
