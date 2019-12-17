import { PersistContainer } from 'unstated-persist'
import {AsyncStorage} from 'react-native'

//----------------------------------------------------------------------
//Container for the locationsComponent
export default class LocationContainer extends PersistContainer {
    
    constructor(props){
        super(props)
        this.state = {
            coordinatesPersistent: [],
            selectedLoc: null,
        }
    }

    addLocation = newLocation => {
        this.setState(prev => ({coordinatesPersistent:[...prev.coordinatesPersistent,newLocation]}))
    }

    deleteLocation = location => {
		const newLocations = this.state.coordinatesPersistent.filter(loc => loc.place !== location)
        this.setState({coordinatesPersistent:newLocations})
    }

    selectedLocation = location => {
        this.setState({selectedLoc:location})
    }

    persist = {
        key: 'coordinates',
        version: 1,
        storage: AsyncStorage
    }
}
//----------------------------------------------------------------------
