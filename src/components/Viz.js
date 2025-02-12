import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";

import { FlyToInterpolator } from "deck.gl";

import { useRef, useState, useEffect } from "react";

import GL from "@luma.gl/constants";

const Container = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  width: 50%;
  height: 99.5vh;
  box-sizing: border-box;
  top: 0;
  right: 0;

  @media screen and (max-width: 1280px) {
    position: relative;
    width: 100%;
    height: 60vh;
  }
`;

export default function Viz() {
  const ref = useRef(null);
  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";
  const [viewState, setViewState] = useState({
    latitude: 37.5663,
    longitude: 126.98,
    zoom: 10.2,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  });

  return (
    <Container ref={ref}>
      <DeckGL
        controller={true}
        layers={[]}
        parameters={{
          blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
          blendEquation: GL.FUNC_ADD,
        }}
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
      >
        <Map
          mapboxAccessToken={
            "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA"
          }
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
    </Container>
  );
}

function defineColor(number) {
  switch (number) {
    default:
      return [255, 128, 93, 50];
  }
}
