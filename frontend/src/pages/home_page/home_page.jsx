import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/API/products");
        const result = await response.json();

        setProducts(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="divhome">
        <div className="divcat">
        <aside className="kategorie">
          <h1 className="nadpis">Kategorie</h1>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
          <a className="text1_kat">g</a>
          <br></br>
        </aside>
        </div>

        <div className="divproductspage">

<div className="divproduct"><h1>dkdoskds</h1></div>
<div className="divproduct"><h1>dkdoskds</h1></div>
<div className="divproduct"><h1>dkdoskds</h1></div>
<div className="divproduct"><h1>dkdoskds</h1></div>

        </div>
      </div>

      {products.map((product) => (
        <div key={product._id}>
          <h1>{product.productName}</h1>
          <img
            src={product.productImagePath}
            alt={`Image for ${product.productName}`}
          />
        </div>
      ))}
    </>
  );
}

export default Home;
