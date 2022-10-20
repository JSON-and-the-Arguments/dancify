import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';

const ScreenTemplate = ({ children, headerPadding }) => {
 //useHeaderHeight is a hook that gives you the height of the header
const headerHeight = useHeaderHeight();

// start={{ x: 0.2, y: 0.1 }}
// end={{ x: 0.5, y: 0.3}}
// colors={[ '#A4508B','#5F0A87', 'black']}

return (
<LinearGradient 
start={{ x: 0.3, y: 0.1 }}
end={{ x: 0.8, y: 0.6}}
colors={[ '#A4508B','#5F0A87', 'black']}
style={{ flex: 1, paddingTop: headerPadding ? headerHeight : 0 }}
>
 {children}
</LinearGradient>
)
}

export default ScreenTemplate