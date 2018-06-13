import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"

class Audio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audios: [],
        }
        this.deleteaudio = this.deleteaudio.bind(this)
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/audios`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ audios: res.data.success });
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
    substr(text, length) {
        if (!text) return text
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
                        <h4>Audio Listings</h4>
                        <ul>
                            {this.state.audios.map((audio) => (
                                <li>
                                    <div className="list-box-listing">
                                        <div className="list-box-listing-img"><a href={`${this.props.match.url}/${audio._id}`}><img src={`${audio.img}`} alt="" /></a></div>
                                     
                                        <div className="list-box-listing-content">
                                            <div className="inner" style={{ textTransform: "capitalize" }}>
                                                <h3><a href={`${this.props.match.url}/${audio._id}`} style={{ textTransform: "capitalize" }}>{audio.name} </a></h3>
                                                <span style={{ textTransform: "capitalize" }}> {this.substr(audio.description, 100)}</span>
                                                <div className="star-rating" data-rating="3.5">
                                                    {/* <div className="rating-counter">({audio.views} views)</div> */}
                                                    {/* <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span> */}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons-to-right">
                                        {/* <a href="#" className="button gray"><i className="sl sl-icon-note"></i> Edit</a> */}
                                        <a href="#" onClick={(e) => this.deleteaudio(e, audio._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
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

export default Audio;