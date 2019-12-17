import React from 'react'
import {Subscribe} from 'unstated'

import LocationContainer from '../Unstated/LocationContainer'
import AddLocationComponent from '../UIComponents/AddLocationComponent'

//----------------------------------------------------------------------
//Screen for the addLocation component
const ScreenAddLoc = props => {
    
    const onSave = (streetName, container) => {
        container.addLocation(streetName)
        props.navigation.navigate("PersistentLocations")
    }

    return(
        <Subscribe to={[LocationContainer]}>{
            container => (
                <AddLocationComponent 
                    onSave={streetName => onSave(streetName, container)}/>
            )
        }</Subscribe>
    )
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//Navigation options for this screen
ScreenAddLoc.navigationOptions = ({ navigation }) => ({
	title: "Locations of interest"
})
//----------------------------------------------------------------------

export default ScreenAddLoc
