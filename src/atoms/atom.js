import { atom } from "recoil";

export const currentPageState = atom({
  key: "pageState",
  default: 0,
});

export const peakBoolState = atom({
  key: "peakBoolState",
  default: true,
});

export const returnBoolState = atom({
  key: "returnBoolState",
  default: false,
});

export const rentBoolState = atom({
  key: "rentBoolState",
  default: true,
});
