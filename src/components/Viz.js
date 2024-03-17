import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";

import { TripsLayer } from "deck.gl";
import { useState } from "react";

import { subwayStationLayer } from "../layers/stationLayers";

import magokRents from "../utils/data/magok.json";
import myRents from "../utils/data/mokdong_yeongdeungpo.json";

import GL from "@luma.gl/constants";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 1280px;
  height: 99.5vh;

  & .mapboxgl-popup.mapboxgl-popup-anchor-bottom {
    position: absolute;
    z-index: 2;
    top: 0;
  }
`;

const TimeContainer = styled.p`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-weight: bold;
  font-size: 20;
`;

export default function Viz() {
  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const [time, setTime] = useState(3600 * 8);
  // const [animation] = useState({});

  // const animationSpeed = 5;

  // const animate = () => {
  //   setTime((t) => (t > 3600 * 9 ? 3600 * 6 : t + animationSpeed));
  //   animation.id = window.requestAnimationFrame(animate);
  // };

  // useEffect(() => {
  //   animation.id = window.requestAnimationFrame(animate);
  //   return () => window.cancelAnimationFrame(animation.id);
  // }, [animation, animate]);

  const [view, setView] = useState({
    latitude: 37.5663,
    longitude: 126.978,
    zoom: 12,
  });

  const magokTripLayer = new TripsLayer({
    id: "trips-layer",
    data: magokRents,
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

  const MYTripLayer = new TripsLayer({
    id: "trips-layer-my",
    data: myRents,
    getPath: (d) => {
      return d.path;
    },
    getTimestamps: (d) => d.timestamp,
    getColor: [253, 128, 93, 128],
    opacity: 1,
    widthMinPixels: 3,
    rounded: true,
    fadeTrail: true,
    trailLength: 40,
    currentTime: time,
  });

  return (
    <Container>
      <DeckGL
        initialViewState={view}
        controller={true}
        layers={[]}
        parameters={{
          blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
          blendEquation: GL.FUNC_ADD,
        }}
        width="100%"
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
    </Container>
  );
}
