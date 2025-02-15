import styled from "styled-components";
import {
  FlyToInterpolator,
  GeoJsonLayer,
  ArcLayer,
  ScatterplotLayer,
} from "deck.gl";
import { useRef, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GL from "@luma.gl/constants";

import { currentPageState } from "../../atoms/atom";
import sampleEntireTrip from "../../utils/data/bike_rental_history_sample.json";
import communitySample from "../../utils/data/bike_rental_history_weekday_community_agg.json";
import bikeLane from "../../utils/data/seoul_bike_lane.geojson";
import subwayStation from "../../utils/data/subway_station.json";
import Legend from "./Legend";

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

  const arcLayer = getArcLayer();
  const communityArcLayer = getCommunityArcLayer();
  const bikeLaneLayer = getBikeLaneLayer();
  const subwayLayer = getStationLayer();

  const currentPage = useRecoilValue(currentPageState);

  useEffect(() => {
    switch (currentPage) {
      case 2:
        setViewState({
          latitude: 37.5638,
          longitude: 126.83,
          zoom: 13.5,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
        });
        break;
      default:
        setViewState({
          latitude: 37.5663,
          longitude: 126.98,
          zoom: 10.2,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
        });
    }
  }, [currentPage]);

  return (
    <Container ref={ref}>
      <DeckGL
        controller={true}
        layers={[
          currentPage === 0 && arcLayer,
          currentPage === 1 && communityArcLayer,
          currentPage === 2 && bikeLaneLayer,
          currentPage === 2 && subwayLayer,
        ]}
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
      {currentPage === 2 && <Legend />}
    </Container>
  );
}

function getArcLayer() {
  return new ArcLayer({
    id: "arc-layer",
    data: sampleEntireTrip,
    getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
    getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
    getSourceColor: [255, 128, 93],
    getTargetColor: [255, 128, 93],
    getWidth: 1,
  });
}

function getCommunityArcLayer() {
  return new ArcLayer({
    id: "community-arc-layer",
    data: communitySample,
    getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
    getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
    getSourceColor: (d) =>
      d.community < 3 ? [255, 93, 93] : [255, 128, 93, 50],
    getTargetColor: (d) =>
      d.community < 3 ? [255, 93, 93] : [255, 128, 93, 50],
    getWidth: 1,
  });
}

function getBikeLaneLayer() {
  return new GeoJsonLayer({
    id: "bike-lane-layer",
    data: bikeLane,
    filled: false,
    lineWidthMinPixels: 5,
    getLineColor: [76, 175, 80, 80],
    getLineWidth: 10,
  });
}

function getStationLayer() {
  return new ScatterplotLayer({
    id: "subway-station-layer",
    data: subwayStation,
    filled: true,
    stroked: false,
    getRadius: 20,
    getPosition: (d) => {
      return [parseFloat(d.longitude), parseFloat(d.latitude)];
    },
    opacity: 0.8,
    getFillColor: [255, 0, 0],
  });
}
