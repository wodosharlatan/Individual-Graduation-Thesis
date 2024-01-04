import React, { useState } from "react";

function New_Product() {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState("");

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();

        formData.append("image", file);
        formData.append("productName", productName);

        const requestOptions = {
            method: "POST",
            body: formData,
            // Add headers
            redirect: "follow",
        };

        fetch("/API/products", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Select File</label>
            <input id="image" type="file" onChange={handleFile} />
            <br />
            <label>Product Name</label>
            <input
                id="productName"
                type="text"
                value={productName}
                onChange={handleProductNameChange}
            />
            <br />
            <br />
            <button type="submit">Upload</button>
        </form>
    );
}

export default New_Product;
