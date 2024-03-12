import { redirect } from "react-router-dom";
import "./_mainstyle.scss";
import { useState, useEffect } from "react";

function handleDirect() {
  window.location.href = `/cart`;
}

function handleDirect1() {
  window.location.href = `/user_setting`;
}

function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
  
  function setCookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue + ";"
  }

  function redirect(){
	window.location.href = "/login";
  }

  function logOut() {
    setCookie("UserToken", " ");
	window.location = "/"
  }
  if (getCookie("UserToken")) {
    return (
      <>
        <nav class="navbar navbar-expand-lg ">
          <div class="container-fluid">
            <a href="/">
              <img className="img-logo" src="../logo.png"></img>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"></li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Hledání..."
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Hledat
                </button>
              </form>
              <i
                className="uil uil-user-circle"
                onClick={() => {
                  handleDirect1();
                }}
              ></i>
              <i
                className="uil uil-shopping-bag"
                onClick={() => {
                  handleDirect();
                }}
              ></i>
              <button className="btn btn-outline-success" onClick={logOut}>Odhlasit se</button>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {categories.length > 0 &&
                  categories.map((Category, index) => (
                    <li class="nav-item nav-item-hidden" key={index}>
                      <a
                        class="nav-link active"
                        aria-current="page"
                        href={`/category/${Category}`}
                      >
                        {Category}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav class="navbar navbar-expand-lg ">
          <div class="container-fluid">
            <a href="/">
              <img className="img-logo" src="../logo.png"></img>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"></li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Hledání..."
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Hledat
                </button>
              </form>
              <button className="btn btn-outline-success" onClick={redirect}>Přihlásit se</button>
              <i
                className="uil uil-shopping-bag"
                onClick={() => {
                  handleDirect();
                }}
              ></i>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {categories.length > 0 &&
                  categories.map((Category, index) => (
                    <li class="nav-item nav-item-hidden" key={index}>
                      <a
                        class="nav-link active"
                        aria-current="page"
                        href={`/category/${Category}`}
                      >
                        {Category}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
