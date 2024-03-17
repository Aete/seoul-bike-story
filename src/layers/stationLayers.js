import { ScatterplotLayer, TripsLayer } from "deck.gl";
import subway from "../utils/data/subway_station.json";

export const subwayStationLayer = new ScatterplotLayer({
  id: "subway-station-layer",
  data: subway,
  getPosition: (d) => {
    return [parseFloat(d["crdnt_x"]), parseFloat(d["crdnt_y"])];
  },
  opacity: 0.8,
  stroked: false,
  filled: true,
  getRadius: 20,
  getFillColor: [255, 0, 0],
});
