import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"
import Singlelisting from "./single-listing"
import apiUrl from "../../config"
import axios from "axios"
class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        }
        this.deletepost = this.deletepost.bind(this)
    }

    componentWillMount() {

        axios.get(`${apiUrl}/api/getMembers`).then((res) => {
            if (res.data.success) {
                this.setState({ artists: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }
    deletepost(e,id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletemember`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/admin/dashboard/artist")
            }
        })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <Switch>
                        <Route path={`${this.props.match.url}/:id`} component={Singlelisting} />

                    </Switch>
                </div>
                <div className="row">
                 
                    <div className="col-lg-12 col-md-12">
                        <div className="dashboard-list-box margin-top-0">
                            <h4>Members Listings</h4>
                            <ul>
                                {this.state.artists.map((artist) => (
                                    <li>
                                        <div className="list-box-listing">
                                            <div className="list-box-listing-img"><a href={`${this.props.match.url}/${artist._id}`}><img src={`${artist.dpUrl}`} alt="" /></a></div>
                                            <div className="list-box-listing-content">
                                                <div className="inner" style={{ textTransform: "capitalize" }}>
                                                    <h3><a href={`${this.props.match.url}/${artist._id}`} style={{ textTransform: "capitalize" }}>{artist.firstName} {artist.lastName}</a></h3>
                                                    <span style={{ textTransform: "capitalize" }}>{artist.country}</span>
                                                    <div className="star-rating" data-rating="3.5">
                                                        <div className="rating-counter">({artist.views} Views)</div>
                                                        <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="buttons-to-right">
                                            <a href={`/admin/dashboard/editmembers/${artist._id}`} className="button gray"><i className="sl sl-icon-note"></i> Edit</a>
                                            <a href="#" onClick={(e)=>this.deletepost(e,artist._id)} className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                                        </div>
                                    </li>
                                ))}


                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Artist;