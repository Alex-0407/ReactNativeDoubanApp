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


class USAList extends React.Component {
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
        movieAction.requestUSAMovieList(true, true, false, '/movie/us_box')

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
        const { movie } = this.props
        if (movie.loading || movie.usaMovies === undefined || movie.usaMovies.length === 0) {
            return <LoadingView msg= { '北美排行加载...' } style={styles.loading}/>
        }

        return (
            <ItemListView
                dataSource={this.state.dataSource.cloneWithRows(movie.usaMovies)}
                isRefreshing={movie.isRefreshing}
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
        borderBottomColor: global.gColor.border
    },
})
export default USAList