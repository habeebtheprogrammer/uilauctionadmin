import React, { Component } from 'react';
import{ Switch,Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreator } from "redux"
import setAuthorizationToken from "../auth"
import auth from "../../reducer/index"
import apiUrl from "../../config"
import axios from "axios"
import moment from "moment"
import Post from "./post"
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }

    componentWillMount() {

        axios.get(`${apiUrl}/api/news`).then((res) => {
            if (res.data.success) {
                this.setState({ news: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        return (
            <div>
            <div className="row">
                <Switch>
                    <Route path={`${this.props.match.url}/:id`} component={Post} />

                </Switch>
            </div>
            <div className="row">

                <div className="col-lg-12 col-md-12">

                    <div className="messages-container margin-top-0">
                        <div className="messages-headline">
                            <h4>Blog post</h4>
                        </div>

                        <div className="messages-inbox">

                            <ul>
                             {this.state.news.map((news)=>(
                                    <li>
                                        <a href={`${this.props.match.url}/${news._id}`}>
                                            <div className="message-avatar"><img src={news.imgUrl} alt="" /></div>

                                            <div className="message-by">
                                                <div className="message-by-headline">
                                                    <h5>{news.title}</h5>
                                                    <span>{moment(news.date).format("LL")}</span>
                                                </div>
                                                <p>{this.substr(news.description,100)}</p>
                                            </div>
                                        </a>
                                    </li> 
                             ))}
                              
                            </ul>

                        </div>
                    </div>

                    <div className="clearfix"></div>
                    {/* <div className="pagination-container margin-top-30 margin-bottom-0">
                        <nav className="pagination">
                            <ul>
                                <li><a href="#" className="current-page">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#"><i className="sl sl-icon-arrow-right"></i></a></li>
                            </ul>
                        </nav>
                    </div> */}

                </div>
            </div>
            </div>

        );
    }
}

export default Messages;
