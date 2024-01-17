import "./_mainstyle.scss";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="div_img">
          <img className="img" src="./logo.png"></img>
        </div>

        <div className="topnav">
          <input type="text" placeholder="Hledání..." />
        </div>

        <div className="div_user">
          <div>
            <i className="uil uil-shopping-basket"></i>
          </div>

          <div className="divokys">

            <div className="okkkkk">
              <a href="/login" className="text1">Přihlásit se</a>
              <br></br>
              <a href="/registration" className="text1">Registrovat</a>
            </div>
            <div>
              <i className="uil uil-user-circle"></i>
            </div>


          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default Navbar;
