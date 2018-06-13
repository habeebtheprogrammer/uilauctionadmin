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
import event from './event';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            results: []
        }
        this.showlist = this.showlist.bind(this);
    }

    substr(text, length) {
        
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    showlist(){
           var div;
            this.state.results.map((item) => {
                if(item.startTime) 
                div= <li>
                    <a href={`/admin/dashboard/events/${item._id}`}>
                        <div className="message-avatar"><img src={item.imgUrl} alt="" /></div>

                        <div className="message-by">
                            <div className="message-by-headline">
                                <h5>{item.title}</h5>
                                <span>{moment(item.date).format("LL")}</span>
                            </div>
                            <p>{this.substr(item.description, 100)}</p>
                        </div>
                    </a>
                </li>
                else if(item.username)
                    div= <li>
                        <a href={`/admin/dashboard/artist/${item._id}`}>
                            <div className="message-avatar"><img src={item.imgUrl} alt="" /></div>

                            <div className="message-by">
                                <div className="message-by-headline">
                                    <h5>{item.firstName} {item.lastName}</h5>
                                    <span>{item.selectedIndustry}</span>
                                </div>
                                <p>{this.substr(item.bio, 100)}</p>
                            </div>
                        </a>
                    </li>
                else if (item.price)
                    div = <li>
                        <a href={`/admin/dashboard/marketplace/${item._id}`}>
                            <div className="message-avatar"><img src={item.imgUrl} alt="" /></div>

                            <div className="message-by">
                                <div className="message-by-headline">
                                    <h5>{item.title}</h5>
                                    <span>{item.price}</span>
                                </div>
                                <p>{this.substr(item.description, 100)}</p>
                            </div>
                        </a>
                    </li>
            })
            
            return div
    }
      typing(e){
        e.preventDefault();
        this.setState({[e.target.name] :e.target.value},(state)=>{
            axios.get(`${apiUrl}/api/search?name=${this.state.name}&location=${this.state.location}`).then((res) => {
                if (res.data.results) {
                    //    this.setState({result:res.data.search});
                    var users = res.data.results[0].users
                    var events = res.data.results[1].events
                    var products= res.data.results[2].products
                    var all = users.concat(events,products)
                    console.log(users,all)
                    
                    this.setState({ searching: false, results: all})
                }
            });
        })
    }

    render() {
        return (
            <div>
            <div className="row">

                <div className="col-lg-12 col-md-12">
                        <form className="search" action={`/search?name=${this.state.name}&location=${this.state.location}`}>
                            <div style={{ padding: "10px 0px 0px" }}>
                                <div className="row" style={{ marginBottom: "0px" }}>
                                    <div className="col-md-12" style={{ }}>
                                        <input type="text" onChange={this.typing.bind(this)} placeholder="Search" name="name" class="form-control" required="required" style={{ borderLeft: "1px solid #eee" }} />
                                    </div>
                                    {/* <div className="col-md-2">
                                        <button className="btn red lighten-1 waves-effect waves-red z-depth-0" style={{ height: "34px" }}><i className="material-icons" >search</i></button>
                                    </div> */}
                                </div>
                            </div>
                          
                        </form>
                    <div className="messages-container margin-top-0">
                        <div className="messages-headline">
                            <h4>Search Results</h4>
                        </div>

                        <div className="messages-inbox">

                            <ul>
                                {this.showlist()}
                       
                              
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

export default Search;
