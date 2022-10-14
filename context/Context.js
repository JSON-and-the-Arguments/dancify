import { createContext } from 'react';

const GlobalContext = createContext({
  rooms: [],
  setRooms: () => {},
});

export default GlobalContext;
