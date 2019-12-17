import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

//----------------------------------------------------------------------
//Component for the adding locations to the persisten list of coordinates
export default class AddLocationComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            place: null,
        }        
    }

    handleSave = () => {
        this.props.onSave({place: this.state.place})
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Type location to add to the list</Text> 
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.place}
                    placeholder = "street name"
                    onChangeText = {(place) => this.setState({place})}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSave}>
                        <Text style={styles.buttonText}>SAVE</Text>
                </TouchableHighlight>
            </View>
        )
    }
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
    text: {
        fontSize: 18,
    }, 
    button: {
		alignSelf: 'auto',
		marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
		borderRadius: 10,
		height: 30,
        justifyContent: 'center',
        backgroundColor:'#f4511e',
	},
	buttonText: {
		color: 'black',
		fontSize: 18,
        alignSelf: 'center'
    },
    textInput:{
        height: 30, 
        borderColor: 'black', 
        borderWidth: 1,
    },
})