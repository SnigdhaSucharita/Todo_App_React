import { atom } from "recoil";

export const tokenState = atom({
    key: 'authState',
    default: { token: null }
});