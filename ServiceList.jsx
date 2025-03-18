import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from "reactstrap"
import weatherImg from "../assets/images/weather.png"
import guideImg from '../assets/images/guide.png'
import customizationImg from'../assets/images/customization.png'

const servicesData=[
    {
      imgUrl: weatherImg,
    title:"Calculate Weather",
    desc:"lorem dfgdigh dfjdf fdfre fgfhtgb dsfew gfsdhf dfnbdjf",
    },
    {
        imgUrl: guideImg,
        title:"Best Tour Guide",
        desc:"ljsfoe frv kjh irfwh kefh fgiwur rfgq yfuih efbuytr",
    },
    {
        imgUrl: customizationImg,
        title:"Customization",
        desc:"dhfgoegf jdfo euiwf dnf guewfy efgu weioaduhe4rwieub",
    },
]

function ServiceList() {
  return( <>
  {
    servicesData.map((item,index)=>(<Col lg='3'md='6' sm='12'className="mb-4" key={index}><ServiceCard item={
    item}/>
    </Col>))
  }
  </>
  );
};

export default ServiceList