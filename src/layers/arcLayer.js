import sampleEntireTrip from "../utils/data/bike_rental_history_sample.json";
import communitySample from "../utils/data/bike_rental_history_top10_community_agg.json";
import { ArcLayer } from "@deck.gl/layers";

export const arcLayer = new ArcLayer({
  id: "arc-layer",
  data: sampleEntireTrip,
  getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
  getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
  getSourceColor: [255, 128, 93],
  getTargetColor: [255, 128, 93],
  getWidth: 1,
});

export const communityArcLayer = new ArcLayer({
  id: "arc-layer",
  data: communitySample,
  getSourcePosition: (d) => [d.origin_lng, d.origin_lat],
  getTargetPosition: (d) => [d.desti_lng, d.desti_lat],
  getSourceColor: [255, 128, 93],
  getTargetColor: [255, 128, 93],
  getWidth: 1,
});
