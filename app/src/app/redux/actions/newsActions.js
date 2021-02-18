import * as types from "./actionTypes";
import * as api from './../../modules/blog/services/blog.service'


export function createNewsSuccess(news) {
  return { type: types.CREATE_NEWS_SUCCESS, news };
}
export function updateNewsSuccess(news){
  return {type:types.EDIT_NEWS_SUCCESS,news};
}
export function loadNewsSuccess(news) {
  return { type: types.LOAD_NEWS_SUCCESS, news };
}

export function loadNews() {
  return function(dispatch) {
    return api
      .getBlogs()
      .then(result => {
        dispatch(loadNewsSuccess(result.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function createNews(data){
  return function(dispatch){
    return api.createBlogs(data).then(result=>{
      dispatch(createNewsSuccess(result.data));
    })
    .catch(error => {
      throw error;
    });
  }
}
export function editNews(data){
  return function(dispatch){
    return api.updateBlogs(data).then(result=>{
      dispatch(updateNewsSuccess(result.data));
    })
    .catch(error => {
      throw error;
    });
  }
}