import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

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

  const fetchCategories = async () => {
    try {
      const response = await fetch("/API/categories");
      const result = await response.json();

      console.log(result);

      setCategories(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="divhome">
        <div className="divcat">
          <aside className="kategorie">
            <h1 className="nadpis">Kategorie</h1>
            {categories.map((Category, index) => (
              <div key={index}>
                <a className="text1_kat" href="/">
                  {Category}
                </a>
                <br></br>
              </div>
            ))}
            <br></br>
          </aside>
        </div>

        <div className="divproductspage2">
          {products.map((product) => (
            <div className="divproduct" key={product.id}>
              <div className="divproduct_img">
                <img
                  src={product.productImagePath}
                  alt={`Image for ${product.productName}`}
                />
              </div>

              <div className="divproduct_rating">
                <h2>{product.productRating}</h2>
              </div>
              <div className="divproduct_name">
                <h1>{product.productName}</h1>
              </div>
              <div className="divproduct_price">
                <h1>price</h1>
              </div>
              <div className="divproduct_add">Do košíku</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
