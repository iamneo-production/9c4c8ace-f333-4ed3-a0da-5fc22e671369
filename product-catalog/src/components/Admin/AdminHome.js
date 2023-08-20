import React from 'react';
import AdminNavbar from '../../navbars/AdminNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import './AdminHome.css'; // Import the CSS file for custom styles
import { useNavigate } from 'react-router-dom';
//import { Image } from 'cloudinary-react';

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container vh-100">
      <AdminNavbar />
      {/* <Image className="admin-home-background-image" crop="fill" cloudName="dzux2g6rf" publicId="https://res.cloudinary.com/dzux2g6rf/image/upload/v1685292369/HomeScreenbg_pgwmg8.webp"/> */}
      <Container className="admin-home-content">
        <Row>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/addProducts")}>
            <div>
              Add Products 
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewAllCatagories")}>
            <div>
              View All Catagories
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="admin-home-col" onClick={() => navigate("/deleteProducts")}>
            <div>
              Delete Products
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default AdminHome;
