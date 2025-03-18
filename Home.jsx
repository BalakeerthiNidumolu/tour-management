import React from 'react'
import '../styles/home.css'
import {Container,Row,Col} from "reactstrap"
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from '../shared/Subtitle'
import worldImg from '../assets/images/world.png'
import SearchBar from '../shared/SearchBar'
import ServiceList from "../services/ServiceList"
import experienceImg from '../assets/images/experience.png'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import Newsletter from '../shared/Newsletter'
function Home() {
  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className='hero__content'>
           <div className="hero__subtitle d-flex align-items-center">
            <Subtitle  subtitle={"Know Before   You Go"}/>
            <img  width='4px'src={worldImg} alt="" />
           </div>
           <h1>
            Travelling Opens the door to Create <span className="highlight">Memories</span>
           </h1>
           <p>Lorem ipsum dolor sit sdhdiuwghawsvdnbdvwqudfuqwvd amet molestias ut, eaque quod voluptatum, deleniti tempore animi ipsum, vel quisquam consectetur. Quaerat, tempora. Porro adipisci non est beatae ratione commodi!</p>
          </div>
          </Col>
           <Col lg='2'>
           <div className="hero_img-box">
            <img src={heroImg} alt="" />
           </div>         
           </Col>
           <Col lg='2'>
           <div className="hero_img-box hero__video-box mt-4">
            <video src={heroVideo} alt="" controls/>
           </div>         
           </Col>
           <Col lg='2'>
           <div className="hero_img-box mt-5">
            <img src={heroImg02} alt="" />
           </div>         
           </Col>
        <SearchBar/>
        </Row>
      </Container>
    </section>
    {/* hero section start */}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
          <h5 className="services__subtitle">What we serve</h5>
          <h2 className="services__title">We offer our best services</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
    </section>
    {/* featured tour section start  */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className="mb-5">
          <Subtitle subtitle={'Explore'}/>
          <h2 className="featured__tour-title">Our featured Tours</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className="experience__content">
            <Subtitle subtitle={'Experience'}/>
         <h2>With our all experience we will serve you</h2>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laudantium, impedit ipsa dolores fugit blanditiis!</p>

          </div>
          <div className="counter__wrapper d-flex align-items-center gap-5">
            <div className="counter__box">
              <span >12k+</span>
              <h6>
                Successfull trip
              </h6>
            </div>
            <div className="counter__box">
              <span >2k+</span>
              <h6>
                Regular clients
              </h6>
            </div>
            <div className="counter__box">
              <span >15</span>
              <h6>
                Years experience
              </h6>
            </div>
          </div>
          </Col>
          <Col lg='6'>
          <div className="experience__img">
            <img src={experienceImg} alt=''></img>
          </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
          <Subtitle subtitle={'Gallery'}/>
          <h2 className="gallery__title">Visit our customers tour gallery</h2>
          
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
</section>

<section>
  <Container>
    <Row>
      <Col lg='12'>
      <Subtitle subtitle={'Fans Love'} />
      <h2 className='testimonial__title'>What our fans say about us </h2>
      </Col>
      <Col lg='12'>
      <Testimonials/>
      </Col>
    </Row>
  </Container>
</section>

 <Newsletter/>
    </>
  )
}

export default Home