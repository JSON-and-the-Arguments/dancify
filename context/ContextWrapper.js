import { useState } from 'react';
import Context from './Context';

const ContextWrapper = (props) => {
  const [rooms, setRooms] = useState([]);
  return (
    <Context.Provider value={{ rooms, setRooms }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextWrapper;
