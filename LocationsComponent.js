import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';

//----------------------------------------------------------------------
//Stateless component to render the flatlist of persistent locations
const LocationsItem = props => (
	<View>
		<TouchableHighlight
			style={styles.buttonLocation}
			onPress={() => props.onSelect(props.place)}>
			<Text style={styles.buttonLocationTxt}>{props.place}</Text>
		</TouchableHighlight>
		<TouchableHighlight
			onPress={() => props.onDelete(props.place)}>
			<Text style={styles.buttonRemoveText}>REMOVE</Text>
		</TouchableHighlight>
	<Separator/>
	</View>
)
//----------------------------------------------------------------------

//----------------------------------------------------------------------
// LocationsComponent that receives the props from the Container  
export default class LocationsComponent extends React.Component {
    render() {
		return (
				<View style={styles.container}>
					<Text style={styles.title}>List of locations of interest </Text>
					<Text style={styles.subtitle}>press one of the locations below to use it in the main screen as location for finding articles nearby </Text>
					<FlatList 
						data={this.props.coordinatesPersistent}
						renderItem={({ item }) => 
							<LocationsItem 
								place={item.place}
								onDelete={this.props.onDelete}
								onSelect={this.props.onSelect}
							/>}
						keyExtractor={item => item.place} />
				</View>
      )
    }
  }

//----------------------------------------------------------------------

//Function to style a Separator between component of the UI
function Separator() {
    return <View style={styles.separator} />;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//Styles for this class
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.statusBarHeight,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
	},
	  title: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 10,
	},
	subtitle: {
		fontStyle: 'italic',
		fontSize: 16,
		marginBottom: 10,
  },
	  buttonLocation: {
		alignSelf: 'stretch',
		marginVertical: 10,
		height: 50,
		justifyContent: 'space-evenly',
		backgroundColor: '#f4511e',
	},
	buttonLocationTxt: {
		color: 'white',
		fontSize: 20,
		alignSelf: 'center',
		padding: 5
	},
	buttonRemoveText: {
		color: 'black',
		fontSize: 15,
		alignSelf: 'center',
		padding: 5
	},
	  separator: {
		marginVertical: 9,
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
  });
  //----------------------------------------------------------------------
  