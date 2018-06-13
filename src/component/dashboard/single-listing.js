import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
class Singlelisting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: {},
            media: { product: [], audios: [], videos: [], pictures: [] },
        }
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/artist?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.user) {
                this.setState({ artist: res.data.user, media: res.data.media });
            } else this.setState({ artist: false })
        })
    }

    render() {
        return (
            this.state.artist.email ?
                <div className="col-lg-12 col-md-12" style={{ marginBottom: "20px" }}>
                    <div className="dashboard-list-box margin-top-0">
                        {/* <h4 style={{ textTransform: "capitalize" }}>{this.state.artist.firstName} {this.state.artist.lastName}</h4> */}
                        <ul>
                            <li>
                                <div className="row" style={{ margin: "0px" }}>
                                    <div className="col-sm-4 col-sm-offset-4">
                                        <div style={{ height: "195px", width: "70%", margin: "auto", background: `url('${this.state.artist.dpUrl || "../../../../images/user.png"}')`, borderRadius: "100%", backgroundPosition: "center", backgroundSize: "contain" }}>
                                        </div>

                                    </div>
                                    <div className="col-sm-4 col-sm-offset-4">

                                        <center>
                                            <h2 style={{ textTransform: "capitalize" }}>{this.state.artist.firstName} {this.state.artist.lastName}</h2>
                                            <p style={{ textTransform: "capitalize" }}>{this.state.artist.selectedIndustry}</p>

                                        </center>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="list-box-listing">
                                    {/* <div className="list-box-listing-img"><a href="#"><img src={`${this.state.artist.dpUrl}`} alt="" /></a></div> */}
                                    <div className="list-box-listing-content">
                                        <div className="inner" style={{ textTransform: "capitalize" }}>

                                            <div className="row" style={{ margin: "0px" }}>
                                                <div className="col-sm-12">
                                                    <h3><a href="#" style={{ textTransform: "capitalize" }}>Bio</a></h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.bio}</p>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.descriptions}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Location</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.location}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Genre</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.selectedCategory}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Member since</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{moment(this.state.artist.date).format("LL")}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Email</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.email}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Address </h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.address}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>country </h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.country}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>state</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.address}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Date of Birth</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.dob}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>phone</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.phone}</p>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>company</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.company}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Get in touch via</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.touchbyemail ? "Email" : null} {this.state.artist.touchbysms ? "And SMS" : null}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Receive informations about</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.contactedbynews ? "News" : null} {this.state.artist.contactedbyevent ? "events" : null} {this.state.artist.contactedbypromotion ? "and promotions" : null} </p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>How often do You want to hear from us </h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.missathing ? "I do not want to miss a thing" : "Only important stuff"} </p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Getting in Touch  </h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.donotcontact==="true" ? "Do not contact me" : "Do contact me"} </p>
                                                </div>
                                            </div>

                                            <div className="star-rating" data-rating="3.5">
                                                <div className="rating-counter">{this.state.artist.views} Views | </div>
                                                <div className="rating-counter">{this.state.media.videos.length} video | </div>
                                                <div className="rating-counter">{this.state.media.pictures.length} picture | </div>
                                                <div className="rating-counter">{this.state.media.audios.length} audio  </div>

                                                {/* <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons-to-right">
                                    <a href={`/admin/dashboard/editmembers/${this.state.artist._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a>
                                    <a href="#" onClick={(e) => this.deletepost(e, this.state.artist._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
                : <div></div>
        );
    }
}

export default Singlelisting;