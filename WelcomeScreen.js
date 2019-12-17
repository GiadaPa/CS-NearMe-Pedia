import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';


//----------------------------------------------------------------------
//Main opening screen
export default class WelcomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
		  title: "Welcome"
    })
    
    render() {
      const { navigate } = this.props.navigation

      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>NearMePedia</Text>
          <TouchableHighlight
            onPress={() => navigate('NearBy', { screen: 'ScreenA' })}
            style={styles.button}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableHighlight>
                   
          <TouchableHighlight
            onPress={() => navigate('SavedArticles', { screen: 'ScreenC' })}
            style={styles.button}>
            <Text style={styles.buttonText}>GO TO READING LIST</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        paddingBottom: 10,
    },
    button: {
      alignSelf: 'stretch',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      borderRadius: 10,
      height: 35,
      justifyContent: 'center',
      backgroundColor:'#f4511e',
    },
    buttonText: {
      color: 'black',
      fontSize: 20,
          alignSelf: 'center'
      },
})
//----------------------------------------------------------------------