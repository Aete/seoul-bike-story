import sampleEntireTrip from "../utils/data/bike_rental_history_sample.json";
import communitySample from "../utils/data/bike_rental_history_weekday_community_agg.json";
import { ArcLayer } from "@deck.gl/layers";

export const getArcLayer = function () {
  return new ArcLayer({
    id: "arc-layer",
    data: sampleEntireTrip,
    getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
    getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
    getSourceColor: [255, 128, 93],
    getTargetColor: [255, 128, 93],
    getWidth: 1,
  });
};

export const getCommunityArcLayer = function () {
  new ArcLayer({
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
};
