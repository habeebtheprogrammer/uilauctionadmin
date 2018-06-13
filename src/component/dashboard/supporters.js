import React, { Component } from 'react';
import apiUrl from "../../config"
import axios from "axios"
class Supporters extends Component {
    constructor(props) {
        super(props);
        this.state={
            supporters:[]
        }
        this.deletepost = this.deletepost.bind(this)
    }
    
    componentWillMount() {

        axios.get(`${apiUrl}/api/getSupporters`).then((res) => {
            if (res.data.success) {
                this.setState({ supporters: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }
    deletepost(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deleteartist`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/artist")
            }
        })
    }
    render() {
        return (

            <div className="row">

                <div className="col-lg-12 col-md-12">
                    <div className="dashboard-list-box margin-top-0">
                        <h4>Supporters Listings</h4>
                        <ul>
                            {this.state.supporters.map((artist) => (
                                <li>
                                    <div className="list-box-listing">
                                        <div className="list-box-listing-img"><a href={`${this.props.match.url}/${artist._id}`} ><img src={`${artist.dpUrl}`} alt="" /></a></div>
                                        <div className="list-box-listing-content">
                                            <div className="inner" style={{ textTransform: "capitalize" }}>
                                                <h3><a href={`${this.props.match.url}/${artist._id}`}  style={{ textTransform: "capitalize" }}>{artist.firstName} {artist.lastName}</a></h3>
                                                <span style={{ textTransform: "capitalize" }}>{artist.country}</span>
                                                <div className="star-rating" data-rating="3.5">
                                                    <div className="rating-counter">  ({artist.views} Views)</div>
                                                    <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons-to-right">
                                        <a href={`/admin/dashboard/editmembers/${artist._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a>
                                        <a href="#" onClick={(e) => this.deletepost(e, artist._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
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

export default Supporters;