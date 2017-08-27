import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import px2dp from '../../utils/utils'
import Item from '../../components/Item'
import Icon from 'react-native-vector-icons/Ionicons'

let {width, height} = Dimensions.get('window')

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false
        }
        this.config = [
            {icon:"ios-pin", name:"我的地址"},
            {icon:"ios-heart", name:"我的收藏", color:"#fc7b53"},
            {icon:"md-images", name:"我的相册"},
            {icon:"logo-usd", name:"我的评论", color:"#fc7b53"},
            {icon:"ios-cart", name:"我的积分", color:"#94d94a"},
            {icon:"md-flower", name:"设置"},
            {icon:"ios-outlet", name:"欢迎评分"},
        ]
    }

    renderListItem = () => {
        return this.config.map((item, i) => {
            if(i%3 === 0) {
                item.first = true
            }
            return <Item key={i} {...item}/>
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <ScrollView
                    style={styles.scrollview}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            tintColor="#fff"
                            colors={['#ddd', '#32CD32']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
                        <TouchableWithoutFeedback>
                            <View style={styles.userHead}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Image source={require('../../img/avator.png')} style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                        <Text style={{color: "#333", fontSize: px2dp(18)}}>半天乌云</Text>
                                        <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                            <Icon name="md-ribbon" size={px2dp(14)} color="#333" />
                                            <Text style={{color: "#333", fontSize: 13, paddingLeft: 5}}>QQ: 37117094</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name="ios-arrow-forward-outline" size={px2dp(22)} color="#333" />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.numbers}>
                            <TouchableWithoutFeedback>
                                <View style={styles.numberItem}>
                                    <Text style={{color: "#f90",fontSize: 18, textAlign: "center", fontWeight: "bold"}}>100</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"收藏"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={[styles.numberItem,{borderLeftWidth: 1, borderLeftColor: "#f5f5f5",borderRightWidth: 1, borderRightColor: "#f5f5f5"}]}>
                                    <Text style={{color: "#ff5f3e", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"123"}</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"评论"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.numberItem}>
                                    <Text style={{color: "#6ac20b", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"456"}</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"积分"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            {this.renderListItem()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#32CD32"
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderTopWidth: 0
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numberItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Profile