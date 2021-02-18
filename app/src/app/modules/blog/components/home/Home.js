import React from "react";
import "./Home.scss";
import NewsEdit from "../newsEdit/NewsEdit";
import NewsAdd from "../newsAdd/NewsAdd";
import { getBlogs } from "./../../services/blog.service";
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import * as newsAction from '../../../../redux/actions/newsActions'

export  function Home(props) {
  React.useEffect(() => {
    props.actions.loadNews();
  }, []);

  return (
    <div>
      <h2>
        Home <NewsAdd></NewsAdd>
      </h2>

      <div>
        {props.news &&
          props.news.map((d) => (
            <div key={"wrapper" + d._id}>
              <li className="news-header">
                {d.title}
                <span> </span>
                <NewsEdit id={d._id}></NewsEdit>
              </li>
              <p className="news-content">{d.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    news: state.news
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(newsAction, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);