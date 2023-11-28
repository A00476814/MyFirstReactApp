import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect,useCallback} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import me from "./images/me.png";
import town from "./images/town.png";
import cold from "./images/cold.png"
import mild from "./images/mild.png"
import sunny from "./images/sunny.png"

function App() {
  return (
    <Router>
      <div className="app">
      <nav className="sidebar">
        <Link className="nav-link" to="/">About me</Link>
        <Link className="nav-link" to="/my-town">My Town</Link>
      </nav>
      <div className="main-content">
      <Routes>
          <Route path="/" element={<AboutMe/>} />
          <Route path="/my-town" element={<MyTown/>} />
      </Routes>
      </div>
      </div>
    </Router>
  );
}


function AboutMe() {
  return (
    <div className="about-me">
      <h1>My name is Rishabh Khevaria    (THIS IS MAIN BRANCH)</h1>
      <p>I come from Delhi, India and have completed my Bachelor of Technology in June 2020. My major was Electronics and communication, but I always had a keen interest in computer science related courses. In my third year of under-grad, I decided that I want to build my career in Software engineering rather than electronics, so I started programming by myself along with my course work. I was able to secure a job as a software developer in Amdocs Development centre India in my final year. I worked there as a Java Developer. My team primarily worked on building Microservices to shift T-Mobile USA from legacy systems to easily scalable and better performing Microservice architecture. Apart from that my tech stack included Kafka for async communication between microservices and Couchbase as our main database to store info. After three years I decided to continue my studies and get a master’s degree.</p>
      <p>I really liked MCDA at Saint Mary's University as it focuses a lot on experiential learning along with regular course work. This program will help me in accelerating my career as a Software Developer or even exploring other fields like Data Science.</p>

    </div>
  );
}

function MyTown() {
    const [tempInCel,setTempInCel] = useState(0)
    const [image, setImage] = useState()
    const [tempsymbol, setTempSymbol] = useState("°C")

    useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=29.6857&lon=76.9905&appid=6b3b1fd8dbf101a5e03d00246cfa5b7a', 
      {
      }).then(res=>res.json())
      .then(result=>{
          console.log(result.main.temp - 273.15)
          setTempInCel(result.main.temp - 273.15)

          if ((result.main.temp - 273.15) >= 20)
          {
            setImage(sunny)
          }          
          if ((result.main.temp - 273.15) > 10 & (result.main.temp - 273.15) <= 20)
          {
            setImage(mild)
          }
          if ((result.main.temp - 273.15) <= 10)
          {
            setImage(cold)
          }

      })
  },[])

  const changeUnit = useCallback(()=>{
    setTempSymbol(tempsymbol==="°C"?"°F":"°C")
  },[tempsymbol])


  return (
    <div className="my-town">
      <h1>My hometown is Karnal, Haryana, India</h1>
      <p>Karnal is a historic city in Haryana, India, that has a rich cultural and agricultural heritage. It is said to be founded by Karna, a legendary warrior from the Mahabharata epic. The population was 437000 at the 2022 census.</p>
      <img src={town} alt="town" />
      <img src={image} alt="Weather Condition" className="weather-image" />
      <p>The current weather in Karnal is: {Math.round(tempsymbol==="°C"?tempInCel:(tempInCel * 9/5 + 32))} {tempsymbol}</p>
      <button onClick={changeUnit}>Change to {tempsymbol === "°C" ? "°F" : "°C"}</button>
    </div>
  );
}

export default App;
