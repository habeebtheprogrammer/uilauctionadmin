import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
import {Player} from "video-react"
class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
        }
        this.deletevideo = this.deletevideo.bind(this)
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/videos`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ videos: res.data.success });
            }
        })
    }
    deletevideo(e,id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletevideo`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/video")
            }
        })
    }
    substr(text, length) {
        if(!text)return text
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        return (

            <div className="row">

                <div className="col-lg-12 col-md-12">
                    <div className="dashboard-list-box margin-top-0">
                        <h4>Video Listings</h4>
                        <ul>
                            {this.state.videos.map((video) => (
                                <li>
                                    <div className="list-box-listing">
                                        <div className="list-box-listing-img">
                                            <Player
                                                playsInline
                                                // poster="/assets/poster.png"
                                                src={video.videoUrl}
                                            /></div>
                                        <style>{`
                                                        .video-react-big-play-button.video-react-big-play-button-left{
                                                            display:none;
                                                        }
                                                        `}
                                        </style>
                                        <div className="list-box-listing-content">
                                            <div className="inner" style={{textTransform:"capitalize"}}>
                                                <h3><a href={`${this.props.match.url}/${video._id}`} style={{ textTransform: "capitalize" }}>{video.title} </a></h3>
                                                <span style={{ textTransform: "capitalize" }}> {this.substr(video.description,100)}</span>
                                                <div className="star-rating" data-rating="3.5">
                                                    <div className="rating-counter">({video.views} views)</div>
                                                    <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons-to-right">
                                        {/* <a href="#" className="button gray"><i className="sl sl-icon-note"></i> Edit</a> */}
                                        <a href="#" onClick={(e)=>this.deletevideo(e,video._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                                    </div>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>


            </div>
        );
    }
}

export default Video;