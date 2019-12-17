import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as WebBrowser from 'expo-web-browser'

//----------------------------------------------------------------------
//Component to render the flatlist of articles fetched from the wikipedia API
class ArticlesItem extends React.Component {
    constructor(props){
        super(props)
        this.state={
            articleToAdd: null,
        }
    }

    handlePressButtonAsync = async (title) => {
        let buttonUrl = 'https://en.wikipedia.org/wiki/'
        buttonUrl = buttonUrl.concat(title).replace(/\s/g, "_")
        this.setState({articleToAdd:title})
        let browserRes = await WebBrowser.openBrowserAsync(buttonUrl)
    }

    render(){
        return (
        <View style={styles.articles}>
            <Separator />
            <TouchableHighlight
                style={styles.buttonTitle}
                onPress={() => this.handlePressButtonAsync(this.props.title)}>
                    <Text style={styles.buttonTitleText}>{this.props.title}</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.buttonAdd}
                //The function to add the article to the reading list does not work
                //onPress={() => this.props.onAddToRL(this.props.title)}
                >
                    <Text style={styles.buttonAddText}>ADD TO READING LIST</Text>
            </TouchableHighlight>
        </View>
        )
    }
  }
//----------------------------------------------------------------------
 
//----------------------------------------------------------------------
//Component for the Articles
export default class ArticlesComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errorMessage: null,
            place: " ",
            coordinates: null,
            articlesList: null,
            where: null,
            browserRes: null,
        }        
    }

//SEARCH ARTICLES FOR THE LOCATION SELECTED FROM THE READING LIST
    getRLlocation = async() => {
        const rLlocation = (await Location.geocodeAsync(this.props.selectedLoc))[0]
        const rLlocationCoord =  `${rLlocation.latitude}|${rLlocation.longitude}`
        return(
            rLlocationCoord
        )
    }

//SEARCH INPUT LOCATION function
    getInputLocation = async() => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION) 
        
        if(status !== 'granted'){
            this.setState({
                errorMessage: 'Permission to access location was denied'
            })
        }
        //Get coordinates from a searched location
        const inputLocation = (await Location.geocodeAsync(this.state.place))[0] 
        const inputlLocationCoord = `${inputLocation.latitude}|${inputLocation.longitude}`
        return inputlLocationCoord
    }

//GET CURRENT LOCATION function
    getCurrentLocation = async() => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION) 

        if(status !== 'granted'){
            this.setState({
                errorMessage: 'Permission to access location was denied',
            })
        }

        let location = (await Location.getCurrentPositionAsync({}))
        const locationCoord = `${location.coords.latitude}|${location.coords.longitude}`
        return locationCoord
    }

    setCoordinates = async() => {
        const locationC = await this.getCurrentLocation()
        this.setState({coordinates:locationC})
    }

    setCoordinatesFromInput = async() => {
        const inputLocC = await this.getInputLocation()
        this.setState({coordinates:inputLocC})
    }

    setCoordinatesRLlocation = async() => {
        const rLlocC = await this.getRLlocation()
        this.setState({coordinates:rLlocC})
    }


    handleButtonGetCoord = async() => {
        let result = await this.setCoordinates()
        this.fetchArticles()
    }

    handleButtonGetInputLoc = async() => {
        let result = await this.setCoordinatesFromInput()
        this.fetchArticles()
    }

    handleButtonRlLoc = async() => {
        let res = await this.setCoordinatesRLlocation()
        this.fetchArticles()
    }

//FETCH ARTICLES FROM WIKIMEDIA API
    getArticles = async () => {

        let url = "https://en.wikipedia.org/w/api.php"
            
        let urlParams = {
            action: "query",
            list:"geosearch",
            gscoord: this.state.coordinates,
            gsradius: "10000",
            gslimit: "10",
            format: "json"
        }
        
        url = url + "?origin=*"
    
        Object.keys(urlParams).forEach(function(key) {
            url += "&" + key + "=" + urlParams[key]
        })
    
        const response = await fetch(url)
        const articles = await response.json() 

        const processedArticles = articles.query.geosearch.map( apiArticles => {
            return{
                title: `${apiArticles.title}`,
                dist: `${apiArticles.dist}`
                
            }
        })  
        return processedArticles
    }

    fetchArticles = async () => {
        const articlesList = await this.getArticles()
        this.setState({articlesList})
    }

    render() {   
        return (
            <View style = {styles.container}>
                <Text style = {styles.text}>Type location to get places nearby</Text> 
                <TextInput
                        style = {styles.textInput}
                        value = {this.state.place}
                        placeholder = "street name"
                        onChangeText = {(place) => this.setState({place})}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleButtonGetInputLoc}
                    >
                    <Text style={styles.buttonText}>SEARCH LOCATION</Text>
                </TouchableHighlight>
                <Separator/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleButtonGetCoord}
                    >
                    <Text style={styles.buttonText}>USE CURRENT LOCATION</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleButtonRlLoc}
                    >
                    <Text style={styles.buttonRLText}>USE {this.props.selectedLoc} AS LOCATION</Text>
                </TouchableHighlight> 
                    <FlatList
                        data={this.state.articlesList}
                        renderItem={({ item }) => 
                            <ArticlesItem 
                                title={item.title}
                                dist={item.dist}
                                onAddToRL={this.props.onAddToRL}
                            />}
                        keyExtractor={item => item.title}
                    />
            </View>
        )
    }
}
//----------------------------------------------------------------------

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
    form:{
        flexDirection: 'row',
        alignItems:'stretch',
    },
    text: {
        fontSize: 18,
        alignItems: 'center',
        marginBottom: 10,
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
    
	buttonRLText: {
		color: 'black',
		fontSize: 15,
        alignSelf: 'center'
    },
    textInput:{
        height: 30, 
        borderColor: 'black', 
        borderWidth: 1,
    },
    articles: {
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    buttonTitle: {
        alignSelf: 'stretch',
		marginLeft: 15,
        marginRight: 15,
		borderRadius: 10,
		height: 30,
        justifyContent: 'center',
        backgroundColor:'white',
    },
    buttonAdd: {
        alignSelf: 'stretch',
		marginLeft: 15,
        marginRight: 15,
		borderRadius: 10,
		height: 20,
        justifyContent: 'center',
        backgroundColor: '#f4511e',
    },
    buttonTitleText: {
		color: 'black',
		fontSize: 18,
        alignSelf: 'stretch'
    },
    buttonAddText: {
		color: 'white',
		fontSize: 10,
        alignSelf: 'center'
    },
    separator: {
        marginVertical: 9,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    distanceText: {
        color: 'black',
		fontSize: 18,
        alignSelf: 'stretch',
        marginLeft: 15
    },
  })
  //----------------------------------------------------------------------
  