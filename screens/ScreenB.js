import React from 'react'
import { Button } from 'react-native'
import {Subscribe} from 'unstated'

import LocationContainer from '../Unstated/LocationContainer'
import LocationsComponent from '../UIComponents/LocationsComponent'

//----------------------------------------------------------------------
//Screen for the LocationsComponent
const ScreenB = props => {
	
	const onDelete = (location, coordinatesPersistent) => {
		coordinatesPersistent.deleteLocation(location)
	}

	const onSelect = (location, coordinatesPersistent) => {
		coordinatesPersistent.selectedLocation(location)
		props.navigation.navigate("NearBy")
	}

	return(
		<Subscribe to={[LocationContainer]}>{
			coordinatesPersistent => 
				(<LocationsComponent
					coordinatesPersistent={coordinatesPersistent.state.coordinatesPersistent}
					onDelete={ location => onDelete(location, coordinatesPersistent)}
					onSelect={ location => onSelect(location, coordinatesPersistent)}
					/>
				)
		}</Subscribe>
	)
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//Navigation options for this screen
ScreenB.navigationOptions = ({ navigation }) => ({
	title: "Locations of interest",
			
    headerRight: () => (
        <Button
            color = 'black'
            title = "Add"
            onPress = {() => 
            navigation.navigate('AddNewLocation', { screen: 'ScreenAddLoc' })}
		/>
	)
})
//----------------------------------------------------------------------

export default ScreenB