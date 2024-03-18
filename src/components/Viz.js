import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";

import { ArcLayer, TripsLayer } from "deck.gl";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { useState, useEffect } from "react";

import { subwayStationLayer } from "../layers/stationLayers";

import magokRents from "../utils/data/magok.json";
import myRents from "../utils/data/mokdong_yeongdeungpo.json";
import sample from "../utils/data/sample_1st.json";

import GL from "@luma.gl/constants";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 1280px;
  height: 99.5vh;
`;

const TimeContainer = styled.p`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-weight: bold;
  font-size: 20;
`;

const ButtonContainer = styled.button`
  position: absolute;
  top: 50px;
  right: 20px;
  color: #fff;
  font-weight: bold;
  font-size: 20;
  background-color: #fff;
  transition: ease 0.2s;
  &:active {
    transform: scale(0.95);
  }

  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export default function Viz() {
  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const [time, setTime] = useState(3600 * 17);
  const [animation] = useState({});
  const [mode, setMode] = useState("Particle");

  // const animationSpeed = 5;

  // const animate = () => {
  //   setTime((t) => (t > 3600 * 20 ? 3600 * 17 : t + animationSpeed));
  //   animation.id = window.requestAnimationFrame(animate);
  // };

  // useEffect(() => {
  //   animation.id = window.requestAnimationFrame(animate);
  //   return () => window.cancelAnimationFrame(animation.id);
  // }, [animation, animate]);

  const view = {
    latitude: 37.5663,
    longitude: 126.818,
    zoom: 10.2,
  };

  const sampleTripLayer = new TripsLayer({
    id: "trips-layer",
    data: sample,
    getPath: (d) => {
      return d.path;
    },
    getTimestamps: (d) => d.timestamp,
    getColor: [255, 128, 93, 128],
    opacity: 1,
    widthMinPixels: 3,
    rounded: true,
    fadeTrail: true,
    trailLength: 40,
    currentTime: time,
  });

  const routeLayer = new ArcLayer({
    id: "arc-layer",
    data: sample,
    getSourcePosition: (d) => [d.rent_x, d.rent_y],
    getTargetPosition: (d) => [d.return_x, d.return_y],
    getSourceColor: [255, 128, 93, 8],
    getTargetColor: [255, 128, 93, 8],
    getWidth: 1,
  });

  const heatmapLayer = new HeatmapLayer({
    id: "heatmap-layer",
    data: sample,
    getPosition: (d) => [d.rent_x, d.rent_y],
    theshold: 3,
  });

  const handleClick = (e) => {
    e.preventDefault();
    setMode(mode === "Arc" ? "Heatmap" : "Arc");
    setTime(3600 * 17);
  };

  return (
    <Container>
      <DeckGL
        controller={true}
        layers={[
          mode === "Arc" && routeLayer,
          mode === "Heatmap" && heatmapLayer,
        ]}
        parameters={{
          blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
          blendEquation: GL.FUNC_ADD,
        }}
        width="100%"
        initialViewState={view}
      >
        <Map
          mapboxAccessToken={
            "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA"
          }
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
      <TimeContainer>{`${Math.floor(time / 3600)}/${Math.floor(
        (time % 3600) / 60
      )}/${Math.floor((time % 3600) % 60)}`}</TimeContainer>
      <ButtonContainer onClick={handleClick}>Test</ButtonContainer>
      <ButtonContainer onClick={handleClick}>Test</ButtonContainer>
      <ButtonContainer onClick={handleClick}>Test</ButtonContainer>
    </Container>
  );
}
