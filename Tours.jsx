import React from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tour.css';
import SearchBar from './../shared/SearchBar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';

function Tours() {
  return (
    <>
      {/* Title & Background Section */}
      <CommonSection title={'All Tours'} />
      
      {/* Search Bar Section */}
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      
      {/* Featured Tours Section */}
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <h2 className='featured__tour-title'>Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      
      
    </>
  );
}

export default Tours;
