import styled from "styled-components";
import {
  FlyToInterpolator,
  GeoJsonLayer,
  ArcLayer,
  LineLayer,
  HeatmapLayer,
  SimpleMeshLayer,
} from "deck.gl";
import { useRef, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GL from "@luma.gl/constants";
import { SphereGeometry } from "@luma.gl/engine";

import {
  currentPageState,
  peakBoolState,
  rentBoolState,
  returnBoolState,
} from "../../atoms/atom";
import sampleEntireTrip from "../../utils/data/bike_rental_history_sample.json";
import communitySample from "../../utils/data/bike_rental_history_weekday_community_agg.json";
import top3TotalAgg from "../../utils/data/bike_rental_history_weekday_community_agg_top3.json";
import top3PeakAgg from "../../utils/data/bike_rental_history_weekday_community_top3_agg_peak.json";
import bikeLane from "../../utils/data/seoul_bike_lane.geojson";
import subwayStation from "../../utils/data/subway_traffic_hourly_avg.json";
import magokLandUse from "../../utils/data/magok_landuse_processed.geojson";
import Legend from "./Legend";
import PeakChecker from "./PeakChecker";
import RentChecker from "./RentChecker";

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

  const width = window.innerWidth;

  const [viewState, setViewState] = useState({
    latitude: 37.5663,
    longitude: 126.98,
    zoom: width > 768 ? 10.2 : 9,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  });

  const currentPage = useRecoilValue(currentPageState);
  const isPeak = useRecoilValue(peakBoolState);
  const isRent = useRecoilValue(rentBoolState);
  const isReturn = useRecoilValue(returnBoolState);

  const arcLayer = getArcLayer();
  const communityArcLayer = getCommunityArcLayer();
  const bikeLaneLayer = getBikeLaneLayer();
  const subwayLayer = isPeak ? getStationPeakLayer() : getStationLayer();
  const subwayLineLayer = getStationLineLayer();
  const magokHeatmapLayer = isPeak
    ? getMagokPeakHeatmapLayer()
    : getMagokHeatmapLayer();
  const magokReturnHeatmapLayer = isPeak
    ? getMagokPeakReturnHeatmapLayer()
    : getMagokReturnHeatmapLayer();
  const magokRentArcLayer = getPeakSubwayRentMagokArc();
  const magokReturnArcLayer = getPeakSubwayReturnMagokArc();
  const magokLandUseLayer = getMagokLanduseLayer();

  useEffect(() => {
    switch (currentPage) {
      case 2:
        setViewState({
          latitude: 37.5638,
          longitude: 126.83,
          zoom: width > 768 ? 13.5 : 13,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
          pitch: 0,
          bearing: 0,
        });
        break;
      case 3:
      case 4:
      case 5:
        setViewState({
          latitude: 37.5638,
          longitude: 126.83,
          zoom: width > 768 ? 13.5 : 13,
          transitionDuration: 1500,
          transitionInterpolator: new FlyToInterpolator(),
          pitch: 45,
          bearing: 315,
        });
        break;
      default:
        setViewState({
          latitude: 37.5663,
          longitude: 126.98,
          zoom: width > 768 ? 10.2 : 9,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
        });
    }
  }, [currentPage, width]);

  return (
    <Container ref={ref}>
      <DeckGL
        controller={true}
        layers={[
          currentPage === 0 && arcLayer,
          currentPage === 1 && communityArcLayer,
          currentPage === 2 && bikeLaneLayer,
          currentPage > 1 && currentPage < 5 && subwayLayer,
          currentPage > 1 && currentPage < 5 && subwayLineLayer,
          currentPage === 3 && magokHeatmapLayer,
          currentPage === 4 && magokReturnHeatmapLayer,
          currentPage === 5 && isRent && magokRentArcLayer,
          currentPage === 5 && isReturn && magokReturnArcLayer,
          currentPage === 5 && magokLandUseLayer,
        ]}
        parameters={{
          blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
          blendEquation: GL.FUNC_ADD,
        }}
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        useWebGL2={true}
      >
        <Map
          mapboxAccessToken={
            "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA"
          }
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
      {currentPage === 2 && <Legend />}
      {currentPage > 1 && currentPage < 5 && <PeakChecker />}
      {currentPage === 5 && <RentChecker />}
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
      d.community < 1 ? [255, 93, 93] : [255, 128, 93, 50],
    getTargetColor: (d) =>
      d.community < 1 ? [255, 93, 93] : [255, 128, 93, 50],
    getWidth: 1,
  });
}

function getMagokHeatmapLayer() {
  return new HeatmapLayer({
    id: "magok-heatmap-layer",
    data: top3TotalAgg,
    getPosition: (d) => [d.origin_lng, d.origin_lat],
    getWeight: (d) => d.count,
    radiusPixels: 100,
    intensity: 1,
    threshold: 0.03,
    opacity: 0.8,
  });
}

function getMagokPeakHeatmapLayer() {
  return new HeatmapLayer({
    id: "magok-heatmap-peak-layer",
    data: top3PeakAgg,
    getPosition: (d) => [d.origin_lng, d.origin_lat],
    getWeight: (d) => d.count,
    radiusPixels: 100,
    intensity: 1,
    threshold: 0.03,
    opacity: 0.8,
  });
}

function getMagokReturnHeatmapLayer() {
  return new HeatmapLayer({
    id: "magok-heatmap-return-layer",
    data: top3TotalAgg,
    getPosition: (d) => [d.desti_lng, d.desti_lat],
    getWeight: (d) => d.count,
    radiusPixels: 100,
    intensity: 1,
    threshold: 0.03,
    opacity: 0.8,
  });
}

function getMagokPeakReturnHeatmapLayer() {
  return new HeatmapLayer({
    id: "magok-heatmap-return-peak-layer",
    data: top3PeakAgg,
    getPosition: (d) => [d.desti_lng, d.desti_lat],
    getWeight: (d) => d.count,
    radiusPixels: 100,
    intensity: 1,
    threshold: 0.03,
    opacity: 0.8,
  });
}

function getPeakSubwayRentMagokArc() {
  return new ArcLayer({
    id: "peak-subway-rent-magok-arc",
    data: top3PeakAgg.filter((d) =>
      ["ST-2031", "ST-1718", "ST-2045"].includes(d.origin_station_id)
    ),
    getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
    getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
    getSourceColor: [209, 55, 78],
    getTargetColor: [1, 152, 189],
    getWidth: (d) => d.count,
  });
}

function getPeakSubwayReturnMagokArc() {
  return new ArcLayer({
    id: "peak-subway-return-magok-arc",
    data: top3PeakAgg.filter((d) =>
      ["ST-2031", "ST-1718", "ST-2045"].includes(d.desti_station_id)
    ),
    getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
    getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
    getSourceColor: [209, 55, 78],
    getTargetColor: [1, 152, 189],
    getWidth: (d) => d.count,
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
  const sphere = new SphereGeometry({
    radius: 0.1,
    nlat: 20,
    nlong: 20,
  });

  const sphereLayer = new SimpleMeshLayer({
    id: "sphere-layer",
    data: subwayStation,
    mesh: sphere,
    getPosition: (d) => [d.longitude, d.latitude, 400],
    getColor: [255, 255, 255, 255],
    getScale: (d) => {
      const passenger = Math.sqrt(parseFloat(d.hourly_avg));
      return [passenger, passenger, passenger];
    },
    sizeScale: 6,
    getOrientation: [0, 0, 0],
    material: {
      ambient: 1,
      diffuse: 0,
      shininess: 0,
      specularColor: [0, 0, 0],
    },
    pickable: true,
  });

  return sphereLayer;
}

function getStationPeakLayer() {
  const sphere = new SphereGeometry({
    radius: 0.1,
    nlat: 20,
    nlong: 20,
  });

  const sphereLayer = new SimpleMeshLayer({
    id: "sphere-layer",
    data: subwayStation,
    mesh: sphere,
    getPosition: (d) => [d.longitude, d.latitude, 400],
    getColor: [255, 255, 255, 255],
    getScale: (d) => {
      const passenger = Math.sqrt(parseFloat(d.peak_avg));
      return [passenger, passenger, passenger];
    },
    sizeScale: 6,
    getOrientation: [0, 0, 0],
    material: {
      ambient: 1,
      diffuse: 0,
      shininess: 0,
      specularColor: [0, 0, 0],
    },
    pickable: true,
  });

  return sphereLayer;
}

function getStationLineLayer() {
  return new LineLayer({
    id: "line-layer",
    data: subwayStation,
    getSourcePosition: (d) => [d.longitude, d.latitude, 0],
    getTargetPosition: (d) => [d.longitude, d.latitude, 400],
    getColor: [255, 255, 255, 255],
    opacity: 0.3,
  });
}

function getMagokLanduseLayer() {
  return new GeoJsonLayer({
    id: "magok-landuse-layer",
    data: magokLandUse,
    filled: true,
    getFillColor: (d) => {
      switch (d.properties.landuse) {
        case 2:
          return [244, 67, 54];
        case 1:
          return [255, 235, 59];
        default:
          return [255, 255, 255, 0];
      }
    },
    opacity: 0.02,
  });
}
