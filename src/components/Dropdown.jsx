import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

const Dropdown = ({ data, value, onSelect = () => {} }) => {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = (val) => {
    setShowOption(false);
    onSelect(val);
    console.log(val)
  };
  
  return (
    <View className=" w-80 min-h-42  ">
      <TouchableOpacity
        className="flex-row justify-between  h-10  bg-white w-80  border-slate-300 rounded-md text-sm shadow-sm items-center"
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <Text className="ml-3">
          {/* {console.log(value?.name)} */}
          {!!value ? value?.name : 'Choose an option'}
        </Text>
        <AntDesign
          name="caretdown"
          size={18}
          color="black"
          style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>
      {showOption && (
        <View>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectedItem(item)}
              >
                <Text> {item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
