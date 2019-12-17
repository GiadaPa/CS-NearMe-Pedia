import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'unstated'

import WelcomeScreen from './screens/WelcomeScreen'
import ScreenA from './screens/ScreenA'
import ScreenB from './screens/ScreenB'
import ScreenC from './screens/ScreenC'
import ScreenAddLoc from './screens/ScreenAddLoc'

//----------------------------------------------------------------------
//Stack of all the rootes for the various screens
const RootStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    NearBy: ScreenA,
    PersistentLocations: ScreenB,
    SavedArticles: ScreenC,
    AddNewLocation: ScreenAddLoc
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: 'black',
      headerTitleStyle: {
          fontWeight: 'bold'
      },
    }
  }
)

const AppContainer = createAppContainer(RootStack)

//----------------------------------------------------------------------
//Application container
const App = props => (
  <Provider>
    <AppContainer />
  </Provider>
)
//----------------------------------------------------------------------
export default App
