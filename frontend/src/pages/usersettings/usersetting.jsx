import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Usersetting() {
	return (
		<>
			<Navbar/>
            
            <Footer/>
		</>
	);
}

export default Usersetting;
