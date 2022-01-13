import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

export function Navigation({ isLogin }) {
  return (
    <Navbar bg="warning" variant="light">
      <Container>
        <Navbar.Brand href="/" style={{}}>
          <img
            src="https://evorhei.de/images/evorhei-it.svg"
            width={120}
            className="d-inline-block align-top"
            alt="brand-img"
          />
        </Navbar.Brand>
        <Nav>
          {isLogin && (
            <>
              <Link to="/home" className="nav-link font-weight-bold ">
                Home
              </Link>
              {/* <Link to="/list" className="nav-link font-weight-bold">
                      List
                    </Link> */}
              <Link to="/data" className="nav-link font-weight-bold">
                Data
              </Link>
              <Link to="/logout" className="nav-link font-weight-bold">
              <i className="fas fa-power-off"></i>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
