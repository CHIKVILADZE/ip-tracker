import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import axios from 'axios';
import {Data} from './components/interface';
import 'leaflet/dist/leaflet.css';
import img from './components/assets/img.png';
import arrow from './components/assets/arrow.svg';
import { setFips } from 'crypto';
import { setEnvironmentData } from 'worker_threads';






function App() {
  
 
  const [data,setData] = useState<Data>()
  const [ip, setIp] = useState <string>("")
  const [lat, setLat] = useState (41.697892)
  const [lng, setLng] =useState (44.827095)
  const [timezone, setTimezone] = useState <string> ("")
  const [ postCode , setPostCode] = useState< string | number> ("")
  const [city, setCity] = useState <string> ("")
  const [country, setCountry] = useState <string> ("")
  const [isp, setIsp] = useState <string> ("")
  const [center, setCenter] = useState()
 

 

  const getData = async () => {
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Mozeh4nLwG8jtAu2XfAPMpnlmAvgo&ipAddress= ${ip}`)
      const data : Data = await response.data
      const city = data.location.region
      const country = data.location.country
      const postCode = data.as.asn
      const timezone = data.location.timezone 
      const isp = data.isp
      const lat = data.location.lat
      const lng = data.location.lng

      setData(data)
      setCity(city)
      setCountry(country)
      setPostCode(postCode)
      setTimezone(timezone)
      setIsp(isp)
      setLat(lat)
      setLng(lng)
    

      
     
      
  }

 console.log(postCode)
      

  const handleChange = (e:any) => {
    setIp(e.target.value)
   
  }

  
const handleClick = () => {
  
 getData()
}
   


 




const icon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" 
  width="46" 
  height="56"
  border="3px solid red">
  <path fill-rule="evenodd" 
  d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/>
  </svg>`,
  
});

L.Marker.prototype.options.icon = icon;
const LiveLocation = ({ center }: any) => {
  const map: any = useMap()
  map.setView(center)
  return null;
}

  return (
      <>
        <Header>
          <Title>IP Address Tracker</Title>
          <InputBox>
            <Input  placeholder="Search for any IP address" onChange={handleChange} />
            <Btn onClick={handleClick}><img src={arrow}/></Btn>
          </InputBox>
        </Header>
        <Section>
          <MiniSection>
            <SectionHeader>IP Address</SectionHeader>
            <SectionResult>{ data ? ip : "62.212.48.172"}</SectionResult>
          </MiniSection>
          <MiniSection>
            <SectionHeader>Location</SectionHeader>
            <SectionResult>{ data? `${city},  ${country}   ${ postCode}` : "T'bilisi,   GE 34797 "} </SectionResult>
          </MiniSection>
          <MiniSection>
            <SectionHeader>Timezone</SectionHeader>
            <SectionResult>{data ? timezone : "+04:00"}</SectionResult>
          </MiniSection>
          <MiniSection>
            <SectionHeader>ISP</SectionHeader>
            <SectionResult>{ data ? isp : "System Net Ltd"}</SectionResult>
          </MiniSection>
        </Section>












      
              <MapContainer center={[lat, lng]}  zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <Marker position={[lat, lng]}></Marker>
              <LiveLocation center={[lat, lng]}/>
        
          </MapContainer>
      </>
)

 
  
}

export default App;
  
const Header = styled.div`
  width:100%;
  height:280px;
  background-image:url(${img});
  background-repeat:no-repeat;
  background-size: 100% 280px;
  display:flex;
 
  align-items: center;
  flex-direction: column;
  z-index:1;
 
 
`
const Title = styled.h1`
font-family: 'Rubik';
font-style: normal;
font-weight: 500;
font-size: 32px;
line-height: 30px;
letter-spacing: -0.285714px;
color: #FFFFFF;
margin-top:33px;
  
  @media screen and (max-width:415px){
    font-family: 'Rubik';
font-style: normal;
font-weight: 500;
font-size: 26px;
line-height: 30px;

letter-spacing: -0.232143px;

color:white;

  }
`

const InputBox = styled.div`
width:555px;
height:58px;
display:flex;
flex-direction: row;
margin-top:31px;

 @media screen and (max-width:415px){
  width:327px;
 }
`

  

const Input= styled.input`
  width:449px;
  height:58px;
  border-radius:15px 0 0 15px;
  border:none;
  background-color:white;
 
  padding-left:24px;
  padding-right:24px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #2C2C2C;
  mix-blend-mode: normal;

  @media screen and (max-width:415px){
    width:269px;
    border:none;
  }
`


const Btn = styled.button`
  width:58px;
  height:58px;
  background-color:#000000;
  border-radius: 0 15px 15px 0;
`

const Section = styled.div`
  width:1110px;
  height:161px;
  background-color:white;
  position:absolute;
  top:200px;
  left:165px;
 
  z-index:10;
  border-radius:15px 15px 0 0;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width:415px){
    width:327px;
    height:268px;
    display:flex;
    flex-direction:column;
    padding-top:26px;
    left:24px;
    top:167px;

  }
  
`

const MiniSection = styled.div`
  width:213px;
  height:87px;

  

  @media screen and (max-width:415px){
    display:flex;
    flex-direction: column;
    align-items: center;
    

  }

  
`
const SectionHeader = styled.h6`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  color: #2C2C2C;
  mix-blend-mode: normal;
  opacity: 0.5;

 
`

const SectionResult = styled.p`
  
font-family: 'Rubik';
font-style: normal;
font-weight: 500;
font-size: 26px;
line-height: 30px;
margin-top:13px;

letter-spacing: -0.232143px;

color: #2C2C2C;


@media screen and (max-width:375px){
    margin-top:7px;
  }
`