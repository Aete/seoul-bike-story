import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";

import {
  ArcLayer,
  FlyToInterpolator,
  HeatmapLayer,
  GeoJsonLayer,
  LineLayer,
  SimpleMeshLayer,
} from "deck.gl";
import { useState, useEffect } from "react";

import sample from "../utils/data/2023_weekday_sample_by_route.json";
import clusteredSample from "../utils/data/2023_weekday_sample_by_route_clustered.json";
import tripsByHour from "../utils/data/2023_weekday_sample_by_route_clustered_hour.json";
import countSample from "../utils/data/2023_weekday_cluster_count_by_node.json";
import station from "../utils/data/subway_station.json";
import bikeLane from "../utils/data/seoul_bike_lane.geojson";

import GL from "@luma.gl/constants";
import { SphereGeometry } from "@luma.gl/engine";

import { useRecoilValue } from "recoil";
import {
  communityPositionState,
  scrollPositionState,
  analysisPositionState,
  flowPositionState,
} from "../atoms/atom";

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 100vw;
  height: 99.5vh;
`;

const SliderContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: #fff;
  font-weight: bold;
  margin-bottom: 5px;
`;

export default function Viz() {
  const scrollPosition = useRecoilValue(scrollPositionState);
  const communityPosition = useRecoilValue(communityPositionState);
  const analysisPosition = useRecoilValue(analysisPositionState);
  const flowPosition = useRecoilValue(flowPositionState);
  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const [page, setPage] = useState("total");
  const [viewState, setViewState] = useState({
    latitude: 37.5663,
    longitude: 126.798,
    zoom: 10.2,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  });

  // State for the slider values (start and end time)
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(23);

  useEffect(() => {
    if (communityPosition === 0 && analysisPosition === 0) {
      return;
    }

    if (scrollPosition < communityPosition && scrollPosition > 0) {
      setPage("total");
      setViewState({
        latitude: 37.5663,
        longitude: 126.798,
        zoom: 10.2,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
      return;
    }

    if (scrollPosition > communityPosition) {
      setPage("clustered");
      setViewState({
        latitude: 37.5663,
        longitude: 126.798,
        zoom: 10.2,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
    if (scrollPosition > analysisPosition) {
      setViewState({
        latitude: 37.5638,
        longitude: 126.804,
        zoom: 13.5,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        bearing: -45,
        pitch: 60,
      });
      setPage("heatmap");
    }

    if (scrollPosition > flowPosition) {
      setPage("flow");
      setViewState({
        latitude: 37.5663,
        longitude: 126.798,
        zoom: 10.2,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [
    scrollPosition,
    analysisPosition,
    setViewState,
    communityPosition,
    flowPosition,
  ]);

  const totalArcLayer = new ArcLayer({
    id: "arc-layer",
    data: sample,
    getSourcePosition: (d) => [d.node_x_x, d.node_x_y],
    getTargetPosition: (d) => [d.node_y_x, d.node_y_y],
    getWidth: 1,
    getSourceColor: [255, 128, 93, 50],
    getTargetColor: [255, 128, 93, 50],
    widthScale: 1,
    widthMinPixels: 1,
  });

  const clusteredTripsLayer = new ArcLayer({
    id: "arc-layer",
    data: clusteredSample,
    getSourcePosition: (d) => [d.node_x_x, d.node_x_y],
    getTargetPosition: (d) => [d.node_y_x, d.node_y_y],
    getWidth: 1,
    getSourceColor: (d) => defineColor(d.cluster_id),
    getTargetColor: (d) => defineColor(d.cluster_id),
    widthScale: 1,
    widthMinPixels: 1,
  });

  const clusteredHeatmapLayer = new HeatmapLayer({
    id: "heatmap-layer",
    data: countSample,
    getPosition: (d) => [d.x, d.y],
    getWeight: (d) => d.count,
    radiusPixels: 110,
    opacity: 0.5,
    intensity: 3.5,
  });

  const bikeLaneLayer = new GeoJsonLayer({
    id: "bike-paths-layer",
    data: bikeLane,
    pickable: true,
    stroked: true,
    filled: false,
    lineWidthMinPixels: 5, // 선의 최소 너비
    getLineColor: [76, 175, 80, 80],
    getLineWidth: 10, // 선의 너비
  });

  const sphere = new SphereGeometry({
    radius: 0.1, // 구의 반경 설정 (단위는 지도 좌표계 단위)
    nlat: 20, // 위도 방향으로 구를 나누는 수 (디테일 정도)
    nlong: 20, // 경도 방향으로 구를 나누는 수
  });

  const sphereLayer = new SimpleMeshLayer({
    id: "sphere-layer",
    data: station, // 구를 그릴 위치
    mesh: sphere, // 구의 메쉬 데이터
    getPosition: (d) => [d.longitude, d.latitude, d.count * 400], // 구의 좌표
    getColor: [255, 255, 255, 255], // 구의 색상
    sizeScale: 300, // 구의 크기를 count 값에 따라 설정
    getOrientation: [0, 0, 0], // 구의 회전 설정
    material: {
      ambient: 1,
      diffuse: 0,
      shininess: 0,
      specularColor: [0, 0, 0],
    },
    opacity: 0.3,
    pickable: true, // 객체를 선택 가능하게 설정
  });

  const stationLineLayer = new LineLayer({
    id: "line-layer",
    data: station,
    getSourcePosition: (d) => [d.longitude, d.latitude, 0],
    getTargetPosition: (d) => [d.longitude, d.latitude, d.count * 400], // 구의 좌표
    getColor: [255, 255, 255, 255], // 구의 색상

    opacity: 0.3,
  });

  const clusteredHourlyTripLayer = new ArcLayer({
    id: "arc-layer",
    data: tripsByHour.filter(
      (d) => d.rent_hour >= startTime && d.rent_hour <= endTime && d.count > 1
    ),
    getSourcePosition: (d) => [d.node_x_x, d.node_x_y],
    getTargetPosition: (d) => [d.node_y_x, d.node_y_y],
    getWidth: (d) => d.count,
    getSourceColor: [33, 150, 243, 50],
    getTargetColor: [255, 68, 54, 150],
    widthScale: 1,
    widthMinPixels: 1,
  });

  return (
    <Container>
      <DeckGL
        controller={true}
        layers={[
          page === "total" && totalArcLayer,
          page === "clustered" && clusteredTripsLayer,
          page === "heatmap" && clusteredHeatmapLayer,
          page === "heatmap" && bikeLaneLayer,
          page === "heatmap" && sphereLayer,
          page === "heatmap" && stationLineLayer,
          page === "flow" && clusteredHourlyTripLayer,
        ]}
        parameters={{
          blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
          blendEquation: GL.FUNC_ADD,
        }}
        width="100%"
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

      {/* Slider for selecting start and end time */}
      {page === "flow" && (
        <SliderContainer>
          <Label>Start Time: {startTime}:00</Label>
          <input
            type="range"
            min="0"
            max="23"
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value))}
          />
          <Label>End Time: {endTime}:00</Label>
          <input
            type="range"
            min="0"
            max="23"
            value={endTime}
            onChange={(e) => setEndTime(Number(e.target.value))}
          />
        </SliderContainer>
      )}
    </Container>
  );
}

function defineColor(number) {
  switch (number) {
    default:
      return [255, 128, 93, 50];
  }
}
