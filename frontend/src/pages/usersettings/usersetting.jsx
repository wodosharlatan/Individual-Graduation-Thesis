import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Usersetting() {
	return (
		<>
			<Navbar />

			<h1 className="nadpis">Nastavení uživatelského účtu</h1>
			<br></br>
			<div className="maindiv">
			<h2>Uživatelské údaje</h2>
			<br></br>
				<div className="itemdiv">
					<a>Jméno a příjmení</a>
					<p>Marek Hejral</p>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Datum narození</a>
					<p>18.7.2005</p>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Email</a>
					<p>marek.hejral@seznam.cz</p>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Tel. číslo</a>
					<p>635 434 343</p>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Heslo</a>
					<p> 18.7.2005</p>
					<i class="uil uil-pen"></i>
				</div>
				<hr></hr>
				<h2>Doručovací údaje</h2>
				<br></br>
				<div className="itemdiv">
					<a>Jméno a příjmení</a>
					<p>635 434 343</p>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Ulice a Čp.</a>
					<p>635 434 343</p>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>PSČ</a>
					<p>635 434 343</p>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Město</a>
					<p>635 434 343</p>
					<i class="uil uil-pen"></i>
				</div>
				<hr></hr>
				<div className="conbutton">
					<a>Uložit</a>
				</div>
				

			</div>

			<Footer />
		</>
	);
}

export default Usersetting;
