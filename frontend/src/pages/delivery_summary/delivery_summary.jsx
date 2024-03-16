import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";

function Delivery_summary() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"
        ></meta>
        <meta name="author" content="Tomáš Bosák"></meta>
        <meta name="author" content="Marek Hejral"></meta>
        <title>Shrnutí objednávky | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
      <Navbar />
      <h1 className="nadpis_del">Shrnutí objednávky</h1>
      <hr></hr>
      <div className="div_del_sum_grid">
        <div className="cartitems_sum">
          <img className="cartimg_sum" src="ceskaposta.svg"></img>
          <div className="cartname_sum">
            <p>Název Produktu</p>
          </div>
          <div className="cartquantity_sum">
            <p>
              <input type="number" min={1}></input>
            </p>
          </div>

          <div className="cartdelete_sum">
            <p>Odebrat</p>
          </div>
          <div className="cartprice_sum">
            <p>Cena: 1432,- kč/ks</p>
          </div>
        </div>

        <div className="summary_data">
          <h1 className="nadpis1_sum">Doručovací údaje</h1>
          <hr></hr>
          <div>
            <div>
              <p>Jméno a Příjmení</p>
              <input type="text" placeholder="Marek Hejral"></input>
            </div>
            <div>
              <p>Email</p>
              <input type="text" placeholder="darkyzpedigu@gmail.com"></input>
            </div>
            <div>
              <p>Tel. číslo</p>
              <input type="text" placeholder="607 843 324"></input>
            </div>
            <div>
              <p>Ulice a čp.</p>
              <input type="text" placeholder="Vrchlabí 574"></input>
            </div>
            <div>
              <p>PSČ</p>
              <input type="text" placeholder="518 93"></input>
            </div>
            <div>
              <p>Město</p>
              <input type="text" placeholder="Vrchlabí"></input>
            </div>
            <div>
              <br></br>
              <h1>Způsob doručení</h1>
              <hr></hr>
              <input type="text" placeholder="Česká pošta"></input>
            </div>
          </div>
        </div>

        <div className="cartitems_sum">
          <img className="cartimg_sum" src="ceskaposta.svg"></img>
          <div className="cartname_sum">
            <p>Název Produktu</p>
          </div>
          <div className="cartquantity_sum">
            <p>
              <input type="number" min={1}></input>
            </p>
          </div>

          <div className="cartdelete_sum">
            <p>Odebrat</p>
          </div>
          <div className="cartprice_sum">
            <p>Cena: 1432,- kč/ks</p>
          </div>
        </div>

        <div className="cartitems_sum">
          <img className="cartimg_sum" src="ceskaposta.svg"></img>
          <div className="cartname_sum">
            <p>Název Produktu</p>
          </div>
          <div className="cartquantity_sum">
            <p>
              <input type="number" min={1}></input>
            </p>
          </div>

          <div className="cartdelete_sum">
            <p>Odebrat</p>
          </div>
          <div className="cartprice_sum">
            <p>Cena: 1432,- kč/ks</p>
          </div>
        </div>

        <div className="cartitems_sum">
          <img className="cartimg_sum" src="ceskaposta.svg"></img>
          <div className="cartname_sum">
            <p>Název Produktu</p>
          </div>
          <div className="cartquantity_sum">
            <p>
              <input type="number" min={1}></input>
            </p>
          </div>

          <div className="cartdelete_sum">
            <p>Odebrat</p>
          </div>
          <div className="cartprice_sum">
            <p>Cena: 1432,- kč/ks</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          handleAccept();
        }}
        className="nextbtn"
      >
        <p>Dokončit a zaplatit</p>
      </div>

      <Footer />
    </>
  );
}

export default Delivery_summary;
