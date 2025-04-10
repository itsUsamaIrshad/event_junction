import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../../Config/firebase';
import { AuthContext } from '../../../../context/AuthContext';
import { VscThreeBars } from 'react-icons/vsc';
import { BsSearch } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import './MainHeader.css'; // Custom CSS for additional styles

export default function MainHeader() {
  const { isAuthenticated, dispatch, setActiveStep, setSearch } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
        window.notify('Logout Successfully', 'success');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const firstletter = localStorage.getItem('proLetter');

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-white fixed-top p-3 shadow-sm">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand d-none d-lg-block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/Event%20(1).png?alt=media&token=90189dca-3aa4-458a-ae13-a3437ad9ce76"
                height={60}
                alt="Event Junction Logo"
              />
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
              aria-label="Toggle navigation"
            >
              <VscThreeBars className="fs-2" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/AdminDash/joinEvent" className="nav-link fw-bold mx-2">
                    Manage Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/AdminDash/eventShow" className="nav-link fw-bold mx-2">
                    My Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/AdminDash/eventPage" className="nav-link fw-bold mx-2" onClick={() => setActiveStep(0)}>
                    Create Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/AdminDash/ticketManage" className="nav-link fw-bold mx-2" onClick={() => setActiveStep(0)}>
                    Ticket Manage
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-link text-dark me-3 d-none d-lg-block"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTop"
                  aria-label="Search"
                >
                  <BsSearch className="fs-5" />
                </button>

                {!isAuthenticated ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label="Account"
                    >
                      <MdAccountCircle className="fs-3" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/authentication/login" className="dropdown-item">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/authentication/register" className="dropdown-item">
                          Register
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label="Profile"
                    >
                      <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar
                          style={{ cursor: 'pointer' }}
                          className={
                            firstletter === 'M' ||
                            firstletter === 'A' ||
                            firstletter === 'B' ||
                            firstletter === 'C' ||
                            firstletter === 'D'
                              ? 'bg-danger'
                              : firstletter === 'E' ||
                                firstletter === 'F' ||
                                firstletter === 'G' ||
                                firstletter === 'H' ||
                                firstletter === 'I'
                              ? 'bg-primary'
                              : firstletter === 'J' ||
                                firstletter === 'K' ||
                                firstletter === 'L' ||
                                firstletter === 'N'
                              ? 'bg-secondary'
                              : firstletter === 'O' ||
                                firstletter === 'P' ||
                                firstletter === 'R' ||
                                firstletter === 'S' ||
                                firstletter === 'T'
                              ? 'bg-success'
                              : firstletter === 'U' ||
                                firstletter === 'V' ||
                                firstletter === 'W' ||
                                firstletter === 'X' ||
                                firstletter === 'Y' ||
                                firstletter === 'Z'
                              ? 'bg-info'
                              : ''
                          }
                        >
                          {firstletter}
                        </Avatar>
                      </StyledBadge>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/" className="dropdown-item">
                          Switch to Attending
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Offcanvas Menu for Mobile */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/event-junction-145.appspot.com/o/Event%20(1).png?alt=media&token=90189dca-3aa4-458a-ae13-a3437ad9ce76"
                height={60}
                alt="Event Junction Logo"
              />
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/AdminDash/joinEvent" className="nav-link fw-bold">
                  Manage Event
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminDash/eventShow" className="nav-link fw-bold">
                  My Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminDash/eventPage" className="nav-link fw-bold" onClick={() => setActiveStep(0)}>
                  Create Event
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminDash/ticketManage" className="nav-link fw-bold" onClick={() => setActiveStep(0)}>
                  Ticket Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Search Offcanvas */}
        <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasTopLabel">
              Search Events
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="input-group w-75 mx-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Search Event"
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Event"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}