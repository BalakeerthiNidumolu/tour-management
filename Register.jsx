import React,{useState,useContext} from 'react'
import '../styles/login.css'
import {Link,useNavigate} from 'react-router-dom'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'
import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap'


function Register() {

  const [credentials,setCredentials]=useState({
      email:"",
      password:""
  });
   const navigate=useNavigate()

  const handleChange = e=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
   };

   const handleClick= async e=>{
    e.preventDefault();

    try{
       const res=await fetch('http://localhost:4000/users-api/register',{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(credentials)
       })

       const result=await res.json()
       console.log(result)
       if(result.message==="User registered successfully")
        alert(result.message)
        navigate('/login')
    }
    catch(err)
    {
     alert(err.message);
    }
   }

  return <section>
    <Container>
      <Row>
        <Col lg='8' className="m-auto">
        <div className="login__container d-flex justify-content-between">
          <div className='login__img'>
            <img src={registerImg} alt=""/>
          </div>
          <div className="login__form">
  <div className="user">
    <img src={userIcon} alt="" />
  </div>
  <h2>Register</h2>

<Form onSubmit={handleClick}>
  <FormGroup>
    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
  </FormGroup>
  <FormGroup>
    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
  </FormGroup>
  <Button className="btn secondary_btn auth_btn" type="submit">Register</Button>
</Form>
<p> Already have an account ? <Link to='/login'>Sign In</Link></p>
       </div>
        </div>
        </Col>
      </Row>
    </Container>
  </section>
}

export default Register