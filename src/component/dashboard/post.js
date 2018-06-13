import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: {},
        }
        this.deletepost = this.deletepost.bind(this)
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/newsbyid?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ news: res.data.success});
            }
        })
    }
    deletepost(e){
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletepost`, { id:this.props.match.params.id ,token}).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/blogposts")
            }
        })
    }
    render() {
        return (
            this.state.news.title?
            <div className="col-lg-12 col-md-12" style={{ marginBottom: "20px" }}>
                <div className="dashboard-list-box margin-top-0">
                    <ul>
                        <li style={{ height: "500px", background: `url('${this.state.news.imgUrl || "../../../../images/main-search-background-01.jpg"}') no-repeat`,backgroundPosition: "center",backgroundSize:"contain"}}>
                            <div className="row" style={{ margin: "0px" }}>
                                <div className="col-sm-4 col-sm-offset-4">
                                    {/* <div style={{ height: "195px",width:"70%",margin:"auto", background: `url('${this.state.news.imgUrl || "../../../../images/user.png"}')`,backgroundPosition: "center" }}>
                                    </div> */}
                           
                                </div>
                                <div className="col-sm-4 col-sm-offset-4">

                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="list-box-listing">
                                <div className="list-box-listing-content">
                                    <div className="inner" style={{ textTransform: "capitalize" }}>

                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col-sm-12">
                                                <h3><a href="#" style={{ textTransform: "capitalize" }}>{this.state.news.title}</a></h3>
                                                {/* <p style={{ textTransform: "capitalize" }}>{this.state.artist.descriptions}</p> */}
                                            </div>
                                            <div className="col-sm-12">
                                                {/* <h3 style={{ textTransform: "capitalize" }}>Location</h3> */}
                                                <p style={{ textTransform: "capitalize" }}>{this.state.news.description}</p>

                                            </div>
                                            
                                        </div>

                                        <div className="star-rating" data-rating="3.5">
                                            <div className="rating-counter">{this.state.news.views} Views | {moment(this.state.news.date).format("LL")} | {this.state.news.category}</div>
                                           

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons-to-right">
                                <a href={`/admin/dashboard/editpost/${this.state.news._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a>
                                <a href="#" onClick={this.deletepost} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                            </div>
                        </li>


                    </ul>
                </div>
            </div>
            :<div></div>
        );
    }
}

export default Post;