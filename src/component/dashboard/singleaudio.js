import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
import {Player} from "video-react"
import Audioplayer from 'react-audioplayer';

class Singleaudio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audio: {},
            artist:{},
            media:{}
        }
        this.deleteaudio = this.deleteaudio.bind(this)
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/audioById?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ audio: res.data.success,artist:res.data.user,media:res.data.media });
            }
        })
    }
    deleteaudio(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deleteaudio`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/audio")
            }
        })
    }
    render() {
        return (
            this.state.audio.name ?
                <div className="col-lg-12 col-md-12" style={{ marginBottom: "20px" }}>
                    <div className="dashboard-list-box margin-top-0">
                        <ul>
                            <li>
                                <div className="row" style={{ margin: "0px" }}>
                                    <div className="col-sm-12">
                                        {/* <div style={{ height: "195px",width:"70%",margin:"auto", background: `url('${this.state.news.imgUrl || "../../../../images/user.png"}')`,backgroundPosition: "center" }}>
                                    </div> */}
                                        <Audioplayer
                                            width={800}
                                            height={400}
                                            autoPlay={false}
                                            fullPlayer={false}
                                            playlist={[{
                                                name: this.state.audio.name, // song name ,
                                                src:  this.state.audio.src, // song source address 
                                                img:  this.state.audio.img
                                            }]}

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
                                                    <h3><a href="#" style={{ textTransform: "capitalize" }}>{this.state.audio.name}</a></h3>
                                                    {/* <p style={{ textTransform: "capitalize" }}>{this.state.artist.descriptions}</p> */}
                                                </div>
                                                <div className="col-sm-12">
                                                    {/* <h3 style={{ textTransform: "capitalize" }}>Location</h3> */}
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.audio.description}</p>

                                                </div>

                                            </div>

                                            <div className="star-rating" data-rating="3.5">
                                                <div className="rating-counter">{moment(this.state.audio.date).format("LL")} | {this.state.audio.industry} | uploaded by {this.state.artist.firstName + " " + this.state.artist.lastName} | <a href={`/admin/dashboard/artist/${this.state.artist._id}`}>view profile</a></div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons-to-right">
                                    {/* <a href={`/admin/dashboard/editevent/${this.audio.event._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a> */}
                                    <a href="#" onClick={(e)=>this.deleteaudio(e,this.state.audio._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div> : <div></div>
        );
    }
}

export default Singleaudio;