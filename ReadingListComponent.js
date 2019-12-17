import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'


//----------------------------------------------------------------------
//Class to render the flatlist of persistent articles
class ArticlesListItem extends React.Component {
    constructor(props){
      super(props)
      this.state={
          articlesName: null,
      }
    }

  handlePressButtonAsync = async (title) => {
    let buttonUrl = 'https://en.wikipedia.org/wiki/'
    buttonUrl = buttonUrl.concat(title).replace(/\s/g, "_")
    //console.log(buttonUrl)
    this.setState({articlesName:title})
    let browserRes = await WebBrowser.openBrowserAsync(buttonUrl)
}



  render() {
    return(
      <View>
        <TouchableHighlight
          style={styles.buttonLocation}
          onPress={() => this.handlePressButtonAsync(this.props.article)}>
          <Text style={styles.buttonLocationTxt}>{this.props.article}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonRemove}
          onPress={() => this.props.deleteArticle(this.props.article)}>
          <Text style={styles.buttonRemoveText}>REMOVE</Text>
        </TouchableHighlight>
      <Separator/>
      </View>
    )
  }
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//Component that receives the props from the Readinglist container
export default class ReadingListComponent extends React.Component {

//Hard coded list since the readingList declared in the Container does not work
  constructor(props){
    super(props)
    this.state = {
        flatLi:[
          {
            article:"Talfer"
          },
          {
            article:"Stadio Druso"
          },
          {
            article:"Madonnina (statue)"
          },
          {
            article:"Ludus Magnus"
          }
        ]
    }        
}

//Hard coded method since the locationContainer's is not received
deleteArticle = article => {
  const flatLi = this.state.flatLi.filter(art => art.article !== article)
  this.setState(prev => ({flatLi:flatLi}))
}

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>List of saved articles</Text>
          <Text style={styles.subtitle}>press one of the articles below to read about it on Wikipedia </Text>
          <FlatList 
            //data={this.props.readingList} the readingList does not work :(
            data={this.state.flatLi}
            renderItem={({ item }) => 
              <ArticlesListItem 
                article={item.article}
                deleteArticle={this.deleteArticle}
					    />}
		  		  keyExtractor={item => item.article} />
        </View>
      )
    }
  }
//----------------------------------------------------------------------
   
//Function to style a Separator between component of the UI
function Separator() {
  return <View style={styles.separator} />;
}
//--------------------------------------------------------------------------------------


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
