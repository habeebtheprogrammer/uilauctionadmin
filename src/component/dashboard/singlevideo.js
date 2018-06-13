import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
import {Player} from "video-react"
class Singlevideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            video: {},
        }
        this.deletevideo = this.deletevideo.bind(this)
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/videoById?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ video: res.data.success });
            }
        })
    }
    deletevideo(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletevideo`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/video")
            }
        })
    }
    render() {
        return (
            this.state.video.title ?
                <div className="col-lg-12 col-md-12" style={{ marginBottom: "20px" }}>
                    <div className="dashboard-list-box margin-top-0">
                        <ul>
                            <li>
                                <div className="row" style={{ margin: "0px" }}>
                                    <div className="col-sm-12">
                                        {/* <div style={{ height: "195px",width:"70%",margin:"auto", background: `url('${this.state.news.imgUrl || "../../../../images/user.png"}')`,backgroundPosition: "center" }}>
                                    </div> */}
                                        <Player
                                            playsInline
                                            // poster="/assets/poster.png"
                                            src={this.state.video.videoUrl}
                                        />
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
                                                    <h3><a href="#" style={{ textTransform: "capitalize" }}>{this.state.video.title}</a></h3>
                                                    {/* <p style={{ textTransform: "capitalize" }}>{this.state.artist.descriptions}</p> */}
                                                </div>
                                                <div className="col-sm-12">
                                                    {/* <h3 style={{ textTransform: "capitalize" }}>Location</h3> */}
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.video.description}</p>

                                                </div>

                                            </div>

                                            <div className="star-rating" data-rating="3.5">
                                                <div className="rating-counter">{this.state.video.views} Views | {moment(this.state.video.date).format("LL")} | {this.state.video.industry}</div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons-to-right">
                                    {/* <a href={`/admin/dashboard/editevent/${this.video.event._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a> */}
                                    <a href="#" onClick={(e)=>this.deletevideo(e,this.state.video._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div> : <div></div>
        );
    }
}

export default Singlevideo;