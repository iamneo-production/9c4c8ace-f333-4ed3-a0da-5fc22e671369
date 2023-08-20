import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import './UserHome.css'; // Import the CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../navbars/UserNavbar';
//import { Image } from 'cloudinary-react';

function UserHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container vh-100">
      <UserNavbar/>
      {/* <Image className="admin-home-background-image" crop="fill" cloudName="dzux2g6rf" publicId="https://res.cloudinary.com/dzux2g6rf/image/upload/v1685292369/HomeScreenbg_pgwmg8.webp"/> */}
      <Container className="admin-home-content">
        <Row>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewUserCategories")}>
            <div>
              View Categories
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/userCart")}>
            <div>
              My Cart
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="admin-home-col" onClick={() => navigate("/viewUserOrders")}>
            <div>
              My Orders
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="admin-home-col" onClick={() => navigate("/viewProfile")}>
            <div>
              View Profile/Edit
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default UserHome;
