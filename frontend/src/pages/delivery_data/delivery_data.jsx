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
        <meta
          name="keywords"
          content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"
        ></meta>
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

      <h1 className="nadpis_del">Doručovací údaje</h1>
      <hr></hr>
      <div className="div_del_data">
        <a className="div_del_a">
          Použít doruřovací údáje z uživatelského účtu
        </a>
        <input className="input_del_data" type="checkbox" />
      </div>
      <hr></hr>
      <div className="div_del_data">
        <a className="div_del_a">Zadat doručovací údaje</a>
        <div className="div_del_data_grid">
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">Jméno a Příjmení</a>
            <input type="text" />
          </div>
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">Ulice a Čp.</a>
            <input type="text" />
          </div>
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">Email</a>
            <input type="text" />
          </div>
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">PSČ</a>
            <input type="text" />
          </div>
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">Tel. číslo</a>
            <input type="text" />
          </div>
          <div className="div_del_data_grid_inputduo">
            <a className="div_del_data_grid_inputduo_a">Město</a>
            <input type="text" />
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          handleAccept();
        }}
        className="nextbtn"
      >
        <p>Další</p>
      </div>

      <Footer />
    </>
  );
}

export default Delivery_data;
