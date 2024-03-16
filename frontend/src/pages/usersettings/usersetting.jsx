import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";
import { Helmet } from "react-helmet";

function Usersetting() {
  const [isDisabled, setDisabled] = useState([]);
  const [isDisabled2, setDisabled2] = useState([]);
  const [isDisabled3, setDisabled3] = useState([]);
  const [isDisabled4, setDisabled4] = useState([]);
  const [isDisabled5, setDisabled5] = useState([]);
  const [data, setData] = useState([]);
  const [tel, setNewTel] = useState("");
  const [nameSur, setNewNameSur] = useState("");
  const [address, setNewAddress] = useState("");
  const [zipcodee, setNewZipcodee] = useState("");
  const [city, setNewCity] = useState("");
  const [email, setMail] = useState("");

  const handleChange = (event) => {
    if (event.target.clicked) {
      console.log("Is Checkec!");
    } else {
      console.log("Is not Checked!");
      setDisabled((current) => !current);
    }
  };
  const handleChange2 = (event) => {
    if (event.target.clicked) {
      console.log("Is Checkec!");
    } else {
      console.log("Is not Checked!");
      setDisabled2((current) => !current);
    } 
  };
  const handleChange3 = (event) => {
    if (event.target.clicked) {
      console.log("Is Checkec!");
    } else {
      console.log("Is not Checked!");
      setDisabled3((current) => !current);
    }
  };
  const handleChange4 = (event) => {
    if (event.target.clicked) {
      console.log("Is Checkec!");
    } else {
      console.log("Is not Checked!");
      setDisabled4((current) => !current);
    }
  };
  const handleChange5 = (event) => {
    if (event.target.clicked) {
      console.log("Is Checkec!");
    } else {
      console.log("Is not Checked!");
      setDisabled5((current) => !current);
    }
  };

  useEffect(() => {
    const userToken = getCookie("UserToken");
    getUserData(userToken);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();



    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      Name: nameSur,
      Telephone: tel,
      StreetNumber: address,
      ZipCode: zipcodee,
      City: city,
      UserToken: getCookie("UserToken"),
    });

    console.log(raw)

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/API/users/zmena-udaju", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCookie("UserToken",result.message)
        console.log(result.message)
      })
      .catch((error) => console.error("Error:", error));
  };

  function setCookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue + ";"
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

  function getUserData(userToken) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/API/users/zmena-udaju/${userToken}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((response) => {

        setNewTel(response.Telephone);
        setNewNameSur(response.Name);
        setNewAddress(response.StreetNumber);
        setNewZipcodee(response.ZipCode);
        setNewCity(response.City);
		setMail(response.Email)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Nastavení uživatele | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>

      <h1 className="nadpis">Nastavení uživatelského účtu</h1>
      <br></br>
      <div className="maindiv">
        <h2>Uživatelské údaje</h2>
        <br></br>
        <div className="itemdiv">
          <a>Email</a>
          <p className="userInput">{email}</p>
        </div>
        <br/>
        <div className="itemdiv">
          <a>Tel. číslo</a>
          <input
            type="tel"
            onChange={(e) => setNewTel(e.target.value)}
			value={tel}
            disabled={isDisabled}
            className="userInput"
          />
          <i class="uil uil-pen" onClick={handleChange}></i>
        </div>
        <br></br>
        <div className="itemdiv">
          <a>Heslo</a>
          <p>*********</p>
          <i
            class="uil uil-pen"
            onClick={() => {
              window.location.href = "/password-reset";
            }}
          ></i>
        </div>
        <hr></hr>
        <h2>Doručovací údaje</h2>
        <br></br>
        <div className="itemdiv">
          <a>Jméno a příjmení</a>
          <input
            type="text"
            onChange={(e) => setNewNameSur(e.target.value)}
            value={nameSur}
            disabled={isDisabled2}
            className="userInput"
          />
          <i class="uil uil-pen" onClick={handleChange2}></i>
        </div>
        <br></br>
        <div className="itemdiv">
          <a>Ulice a Čp.</a>
          <input
            type="text"
            onChange={(e) => setNewAddress(e.target.value)}
            value={address}
            disabled={isDisabled3}
            className="userInput"
          />
          <i class="uil uil-pen" onClick={handleChange3}></i>
        </div>
        <br></br>
        <div className="itemdiv">
          <a>PSČ</a>
          <input
            type="text"
            onChange={(e) => setNewZipcodee(e.target.value)}
            value={zipcodee}
            disabled={isDisabled4}
            className="userInput"
          />
          <i class="uil uil-pen" onClick={handleChange4}></i>
        </div>
        <br></br>
        <div className="itemdiv">
          <a>Město</a>
          <input
            type="text"
            onChange={(e) => setNewCity(e.target.value)}
            value={city}
            disabled={isDisabled5}
            className="userInput"
          />
          <i class="uil uil-pen" onClick={handleChange5}></i>
        </div>
        <hr></hr>
        <div onClick={handleSubmit} className="conbutton">
          <a>Uložit</a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Usersetting;
