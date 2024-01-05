
import React from "react";


function HomeComponent(imgURL) {

	return (
		<>
			<div>
                <img src={imgURL.src} />
                <br />
            </div>
            <br />
		</>
	);
}

export default HomeComponent;
