import { put, take, call, fork } from 'redux-saga/effects'
import * as types from '../constans/ActionTypes'
import Msg from '../utils/MsgUtil'
import { Douban_Url } from '../constans/Url'
import { Request } from '../utils/RequestUtil'
import { fetchHotMovieList, receiveHotMovieList, fetchCommingMovieList, receiveCommingMovieList } from '../actions/Movies'

export function* requestHotMovieList (isRefreshing, loading, isLoadMore, subUrl) {
    try{
        yield put(fetchHotMovieList(isRefreshing, loading, isLoadMore))

        const hotMovieList = yield call(
            Request,
            Douban_Url + subUrl,
            'get'
        )

        const errorMessage = hotMovieList.msg
        if (errorMessage && errorMessage !=='') {
            yield Msg.showShort(errorMessage)
        } else {
            yield  put(receiveHotMovieList(false, false,  hotMovieList.subjects))
        }
    } catch (error) {
        yield put(receiveHotMovieList(false, false, []))
        Msg.showShort('未取到数据，请重试')
    }
}

export function* watchRequestHotMovieList() {
    while (true) {
        const { isRefreshing, loading, isLoadMore, subUrl } = yield take(
            types.REQUEST_HOT_MOVIE_LIST
        )
        yield fork(
            requestHotMovieList,
            isRefreshing,
            loading,
            isLoadMore,
            subUrl
        )
    }
}

export function* requestCommingMovieList (isRefreshing, loading, isLoadMore, subUrl) {
    try{
        yield put(fetchCommingMovieList(isRefreshing, loading, isLoadMore))
        const commingMovieList = yield call(
            Request,
            Douban_Url + subUrl,
            'get'
        )
        const errorMessage = commingMovieList.msg
        if (errorMessage && errorMessage !=='') {
            yield Msg.showShort(errorMessage)
        } else {
            yield  put(receiveCommingMovieList(false, false,  commingMovieList.subjects))
        }
    } catch (error) {
        yield put(receiveCommingMovieList(false, false, []))
        Msg.showShort('未取到数据，请重试')
    }
}

export function* watchRequestCommingMovieList() {
    while (true) {
        const { isRefreshing, loading, isLoadMore, subUrl } = yield take(
            types.REQUEST_COMMING_MOVIE_LIST
        )
        yield fork(
            requestCommingMovieList,
            isRefreshing,
            loading,
            isLoadMore,
            subUrl
        )
    }
}