import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [vsblogout, setVsblogout] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Consider refactoring into a "Sidebar Link" object if more links added
  const LinkOrders = () => {
    return (
      <Link
        className={
          location.pathname === "/" || location.pathname.includes("/orders")
            ? "sidebar-links__selected"
            : ""
        }
        to="/orders"
      >
        <ShippingBagIcon />
        <span>Orders</span>
      </Link>
    );
  };

  /**
   * Logout
   */
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  /**
   * Desktop Icon
   * @returns svg icon
   */
  const DesktopIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z" />
      </svg>
    );
  };

  /**
   * Notepade Icon
   * @returns svg icon
   */
  const NotepadIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z" />
        <path d="M7 9h10v2H7zm0 4h5v2H7z" />
      </svg>
    );
  };

  /**
   * Desktop Icon
   * @returns svg icon
   */
  const ShippingBagIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z" />
      </svg>
    );
  };

  const LinkInvoices = () => {
    if (user && user.accountType === "admin") {
      return (
        <Link
          className={
            location.pathname.includes("/invoices")
              ? "sidebar-links__selected"
              : ""
          }
          to="/invoices"
        >
          <NotepadIcon />
          <span>Invoices</span>
        </Link>
      );
    }
    return <></>;
  };

  const SettingIcon = () => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          width="512"
          height="512"
        >
          <g>
            <path d="M34.283,384c17.646,30.626,56.779,41.148,87.405,23.502c0.021-0.012,0.041-0.024,0.062-0.036l9.493-5.483   c17.92,15.332,38.518,27.222,60.757,35.072V448c0,35.346,28.654,64,64,64s64-28.654,64-64v-10.944   c22.242-7.863,42.841-19.767,60.757-35.115l9.536,5.504c30.633,17.673,69.794,7.167,87.467-23.467   c17.673-30.633,7.167-69.794-23.467-87.467l0,0l-9.472-5.461c4.264-23.201,4.264-46.985,0-70.187l9.472-5.461   c30.633-17.673,41.14-56.833,23.467-87.467c-17.673-30.633-56.833-41.14-87.467-23.467l-9.493,5.483   C362.862,94.638,342.25,82.77,320,74.944V64c0-35.346-28.654-64-64-64s-64,28.654-64,64v10.944   c-22.242,7.863-42.841,19.767-60.757,35.115l-9.536-5.525C91.073,86.86,51.913,97.367,34.24,128s-7.167,69.794,23.467,87.467l0,0   l9.472,5.461c-4.264,23.201-4.264,46.985,0,70.187l-9.472,5.461C27.158,314.296,16.686,353.38,34.283,384z M256,170.667   c47.128,0,85.333,38.205,85.333,85.333S303.128,341.333,256,341.333S170.667,303.128,170.667,256S208.872,170.667,256,170.667z" />
          </g>
        </svg>
      </>
    );
  };

  /**
   * Logout popup visiable or hide
   */
  const visiableLogout = () => {
    setVsblogout(vsblogout ? false : true);
  };

  return (
    <div className="sidebar">
      <img className="logo" src="/new-logo.png" alt="logo" />
      <ul className="sidebar-links position-relative">
        <li>
          <Link to="#">
            <DesktopIcon />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <LinkOrders />
        </li>
        <li>
          <LinkInvoices />
        </li>
        <li className="settings position-absulate bottom">
          <Link onClick={visiableLogout} to="#">
            <SettingIcon />
            <span>Settings</span>
          </Link>
          <div
            className={
              vsblogout
                ? `logoutWrap position-relative active`
                : `logoutWrap position-relative`
            }
          >
            <div className="inner text-left">
              <h4 className="size-18px">{user ? user.name : ""}</h4>
              <h5 className="size-18px">{user ? user.email : ""}</h5>
              <hr className="mt-5px mb-5px" />
              <p className="d-flex align-center gap-8px">
                Language{" "}
                <span>
                  <img src="/flag-1.png" alt="English" />
                </span>
                <span>
                  <img src="/flag-2.png" alt="Chinese" />
                </span>
              </p>
              <button
                className="btn btn-block bg-black text-white mt-2rem mb-0"
                onClick={onLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
