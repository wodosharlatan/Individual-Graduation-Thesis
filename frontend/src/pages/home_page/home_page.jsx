import React, { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/API/products");
        const result = await response.json();

        console.log(result[0].productImage);

        setProducts(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {products.map((product) => (
        <div key={product._id}>
          <h1>{product.productName}</h1>
          {product.productImage && (
            <img
              src={`data:image/png;base64,${arrayBufferToBase64(product.productImage.data)}`}
              alt={`Image for ${product.productName}`}
            />
          )}
        </div>
      ))}
    </>
  );
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default Home;
