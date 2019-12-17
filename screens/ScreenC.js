import React from 'react'
import {Subscribe} from 'unstated'

import ReadingListComponent from '../UIComponents/ReadingListComponent'
import ReadingListContainer from '../Unstated/ReadingListContainer'


//----------------------------------------------------------------------
//Screen for the readinglist component
const ScreenC = props => {

    const onSelect = (article, readingList) => {
        readingList.selectedArticle(article)
    }

    const onDelete = (article, readingList) => {
		readingList.deleteArticle(article)
	}
    
    return(
        <Subscribe to={[ReadingListContainer]}>{
            readingList => 
                (<ReadingListComponent
                    readingList={readingList.state.readingList}
                    onSelect={ article => onSelect(article, readingList)}
                    onDelete={ article => onDelete(article, readingList)}  
                    />
                )
        }</Subscribe>
    )
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//Navigation options for this screen
ScreenC.navigationOptions = ({ navigation }) => ({
		title: "Reading List"
    })
//----------------------------------------------------------------------

export default ScreenC