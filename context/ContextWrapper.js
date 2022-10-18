import { useState } from 'react';
import Context from './Context';

const ContextWrapper = (props) => {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  return (
    <Context.Provider
      value={{ rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextWrapper;
