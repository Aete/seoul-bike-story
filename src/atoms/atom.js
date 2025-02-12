import { atom } from "recoil";

export const currentPageState = atom({
  key: "pageState",
  default: 0,
});
