/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeView from './HomeView'; // Import your HomeView component

const App = (): React.JSX.Element => {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkBackground]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
    
    <HomeView />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  darkBackground: {
    backgroundColor: Colors.darker,
  },
});

export default App;
