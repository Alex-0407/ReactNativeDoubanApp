import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView
} from 'react-native'
import LoadingView from '../../components/LoadingView'
import ItemCell from './ItemCell'
import ItemListView from './ItemListView'


class CommingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
    }

    componentDidMount() {
        const { movieAction } = this.props
        movieAction.requestCommingMovieList(true, true, false, '/movie/coming_soon')

    }
    refreshData = () => {

    }
    onPress = (movie) => {
        const { navigate } = this.props.navigation
        navigate('MovieDetail', {movie})
    }
    renderItem = movie =>
        <ItemCell item={movie} onPressHandler={this.onPress} />

    renderContent = () => {
        if (this.props.loading || this.props.commingMovies === undefined || this.props.commingMovies.length === 0) {
            return <LoadingView style={styles.loading}/>
        }

        return (
            <ItemListView
                dataSource={this.state.dataSource.cloneWithRows(this.props.commingMovies)}
                isRefreshing={this.props.isRefreshing}
                renderItem={this.renderItem}/>
        )
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        marginTop: 100
    },
    hotList: {
        height: 130,
        paddingLeft: 18,
        paddingRight: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },
})
export default CommingList