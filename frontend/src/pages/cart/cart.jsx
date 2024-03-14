import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

function Cart() {
  const cartItems = [];

  const productList = ["Zaklinac", "Telegraph Road23"];

  useEffect(() => {
    fetchProducts(productList);
  }, []);

  function handlePrice(event) {
    setPrice(event.target.value);
  }

  function fetchProducts(productArray) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < productArray.length; i++) {
      fetch(`/API/products/${productArray[i]}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          cartItems.push(result[0]);
        })
        .catch((error) => alert("Error:", error));
    }
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

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
        <title>Košík | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
      <Navbar />
      <div className="divcart">
        {cartItems.map((item) => {
          item.map((element, index) => {
            return (
              <>
                <div className="cartitems" key={index}>
                  <div className="cartimg">
                    <img className="" src={element.productImagePath}></img>
                  </div>
                  <div className="cartname">
                    <p>{element.productName}</p>
                  </div>
                  <div className="cartquantity">
                    <p>
                      <input
                        type="number"
                        min={1}
                        onChange={handlePrice}
                      ></input>
                    </p>
                  </div>

                  <div className="cartdelete">
                    <p>Odebrat</p>
                  </div>
                  <div className="cartprice">
                    <p>Cena: {element.productPrice},- kč/ks</p>
                  </div>
                </div>
              </>
            );
          });
        })}
      </div>

      <div className="totalprice">
        <p>Celkem: ,- kč</p>
      </div>

      <div className="nextbtn">
        <p>Další</p>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
