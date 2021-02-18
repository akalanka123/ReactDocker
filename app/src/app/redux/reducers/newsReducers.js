import * as types from "../actions/actionTypes";
export default function newsReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_NEWS_SUCCESS:
      return [...state, { ...action.news }];
    case types.EDIT_NEWS_SUCCESS:{
      return state.map(news =>
        news.id === action.news.id ? action.news : news
      );
    }
    case types.LOAD_NEWS_SUCCESS:
      return action.news;
    default:
      return state;
  }
}
