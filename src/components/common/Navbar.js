import React from 'react';
import cx from "classnames";
import styles from "./Navbar.module.scss"
import { t } from 'i18next';
import logo from "../../images/open-book.png"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const Search = () => {
    const component = (
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder={t("Search")} aria-label="Search" />
        <button className="btn btn-outline-info" type="submit">Search</button>
      </form>
    )

    return component;
  }

  const DropDown = () => {
    const component = (
      <>
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-star">
          <li><a className="dropdown-item" href="#">{t("Action")}</a></li>
          <li><a className="dropdown-item" href="#">{t("Another_action")}</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </>
    )

    return component
  }

  const UserIcon = () => {
    const component = (
      <a className="dropdown-item nav-link" href="#" onClick={()=>navigate('/logout')}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30 " fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
        </svg>
      </a>
    )

    return component;
  }


  return (
    <nav className={cx("navbar navbar-expand-lg navbar-dark  sticky-top shadow", styles.navCol)}>
      <div className="container-fluid">
        <a className="navbar-brand fs-3" href="#">
          <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top" />
          MESA
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse gap-5" id="navbarSupportedContent" style={{ "flexGrow": 0 }}>
          <Search />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <DropDown />
            </li>
            <li className="nav-item">
              <UserIcon />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar