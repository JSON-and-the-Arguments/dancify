import { createContext } from 'react';

const GlobalContext = createContext({
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});

export default GlobalContext;
