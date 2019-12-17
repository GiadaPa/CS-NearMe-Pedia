import React from 'react'
import { Button,} from 'react-native'
import {Subscribe} from 'unstated'

import ReadingListContainer from '../Unstated/ReadingListContainer'
import LocationContainer from '../Unstated/LocationContainer'
import ArticlesComponent from '../UIComponents/ArticlesComponent'

//----------------------------------------------------------------------
//Screen for the ArticlesComponent
const ScreenA = props => {
    
    const onAddtoRL = (article, readingList) =>{
        readingList.addToReadingList(article)
        console.log(article)
        props.navigation.navigate("SavedArticles")
      }

    return(
        <Subscribe to={[ReadingListContainer, LocationContainer]}>{
            (readingList, selectedLoc) => (
                <ArticlesComponent
                    readingList={readingList.state.readingList}
                    onAddtoRL={article => onAddtoRL(article, readingList)}
                    selectedLoc={selectedLoc.state.selectedLoc}
                />
            )
        }</Subscribe>
    )
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//Navigation options for this screen
ScreenA.navigationOptions = ({ navigation }) => ({
        title: "Places nearby",
        headerLeft: () => (
            <Button
                color = 'black'
                title = "Locations"
                onPress = {() => 
                    navigation.navigate('PersistentLocations', { screen: 'ScreenB' })}
            />
        ),
        headerRight: () => (
            <Button
                color = 'black'
                title = "Reading list"
                onPress = {() => 
                    navigation.navigate('SavedArticles', { screen: 'ScreenC' })}
            />
        )
})
//----------------------------------------------------------------------

export default ScreenA