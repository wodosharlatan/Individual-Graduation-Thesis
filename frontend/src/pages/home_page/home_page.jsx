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

        <div className="divproductspage2">

        {products.map((product) => (
          <div className="divproduct" key={product.id}><h1></h1>
          <h1>{product.productName}</h1>
          <h2>{product.productRating}</h2>
          <img
            src={product.productImagePath}
            alt={`Image for ${product.productName}`}
            
          />
          </div>
        
      ))}
        </div>
      </div>

      
    </>
  );
}

export default Home;
