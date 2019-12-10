import React, {useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, google } from "react-google-maps";
import data from "./data.json";

function Map() {

  const [selectedPark, setSelectedPark] = useState(null);
  const [filtreSelect, setFiltreSected] = useState(0);

  return (
    <div>
  
    <input 
      type="button"
      value="Les classiques"
      onClick={()=>setFiltreSected(0)}
    />
    <input 
      type="button"
      value="Pour les enfants"
      onClick={()=>setFiltreSected(1)} 
    />
    <input 
      type="button"
      value="Underground"
      onClick={()=>setFiltreSected(2)}
    />
    <input 
      type="button"
      value="Ecotourism"
      onClick={()=>setFiltreSected(3)}
    />
                    
    <GoogleMap defaultZoom={12}
    defaultCenter={{ lat: 51.506895, lng: -0.127788}} 
    >
    {data[filtreSelect].map(park => (
      <Marker
      key = {park.properties.ID}
      position= {{
        lat: park.geometry.coordinates[1],
        lng: park.geometry.coordinates[0]
      }}
      onClick={() => {
        setSelectedPark(park);
        console.log(selectedPark);
      }}
      icon={{
        url: park.properties.ICON
      }}
      />
    ))}
    
    {selectedPark && (
      <InfoWindow
      position= {{
        lat: selectedPark.geometry.coordinates[1],
        lng: selectedPark.geometry.coordinates[0]
      }}
      onCloseClick={() => {
        setSelectedPark(null);
      }}>
        <div>
          <p>{selectedPark.properties.NAME}</p>
          <p>{selectedPark.properties.INFO}</p>
          <img src={selectedPark.properties.IMAGE} height="50px" width="50px"/>
        </div>
      </InfoWindow>
    )}
    </GoogleMap>
    </div>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
  <div style={{width: "90vw", height: "90vh"}}>
    <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?=3.exp&
    libraries=geometry,drawing,places=${
      process.env.REACT_APP_GOOGLE_KEY
    }`}
    loadingElement={<div style={{height: '100%'}} /> }
    containerElement={<div style={{height: '100%'}} /> }
    mapElement={<div style={{height: '100%'}} /> }
    />
  </div>
  );
}
