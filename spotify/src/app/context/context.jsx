"use client";

import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLoading: false,
  audioData: {},
  detailAlbum: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SETAUDIO_PLAYER":
      return {
        isLoading: true,
        audioData: payload,
        detailAlbum : state.detailAlbum
      };
    case "SET_DETAIL_ALBUM":
      return {
        isLoading: false,
        audioData: state.audioData,
        detailAlbum: payload,
      };
    case "RESET_LOADING":
      return {
        isLoading: false,
        audioData: state.audioData,
        detailAlbum : state.detailAlbum
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  setTimeout(() => {
    dispatch({ type: "RESET_LOADING" });
  }, 2000);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
