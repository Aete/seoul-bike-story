import { atom } from "recoil";

export const scrollPositionState = atom({
  key: "scrollPositionState",
  default: 0,
});

export const communityPositionState = atom({
  key: "communityPositionState",
  default: 0,
});

export const analysisPositionState = atom({
  key: "analysisPositionState",
  default: 0,
});

export const flowPositionState = atom({
  key: "flowPositionState",
  default: 0,
});
