import { atom } from "recoil";

export const currentPageState = atom({
  key: "pageState",
  default: 0,
});

export const peakBoolState = atom({
  key: "peakBoolState",
  default: true,
});
