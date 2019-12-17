import { PersistContainer } from 'unstated-persist'
import {AsyncStorage} from 'react-native'

//----------------------------------------------------------------------
//Container for the persisten list of articles
export default class ReadingListContainer extends PersistContainer {
    
    constructor(props){
        super(props)
        this.state = {
            readingList: [],
            selectedArticle: null,
        }
    }
    selectedArticle = article => {
        this.setState({selectedArticle:article})
        console.log(this.state.selectedArticle)
    }

    addToReadingList = newArticle => {
        this.setState(prev => ({readingList:[...prev.readingList, newArticle]}))
        console.log(this.state.readingList)
    }

    deleteArticle = article => {
        const newReadingList = this.state.readingList.filter(art => art.article !== article)
        this.setState({readingList:newReadingList})
    }

    persist = {
        key: 'coordinates',
        version: 1,
        storage: AsyncStorage
    }
}
//----------------------------------------------------------------------