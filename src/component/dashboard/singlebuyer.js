import React, { Component } from 'react';
import axios from "axios";
import apiUrl from "../../config"
import moment from "moment"
class Singlebuyer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: {},
            product:{}
        }
    }


    componentWillMount() {
        axios.get(`${apiUrl}/api/singlebuyer?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.user) {
                this.setState({ artist: res.data.user, product:res.data.product});
            } else this.setState({ artist: false })
        })
    }

    render() {
        return (
        this.state.artist.email?
            <div className="col-lg-12 col-md-12" style={{ marginBottom: "20px" }}>
                <div className="dashboard-list-box margin-top-0">
                    {/* <h4 style={{ textTransform: "capitalize" }}>{this.state.artist.firstName} {this.state.artist.lastName}</h4> */}
                    <ul>
                        <li>
                            <div className="row" style={{ margin: "0px" }}>
                                <div className="col-sm-4 col-sm-offset-4">
                                    <div style={{ height: "195px",width:"70%",margin:"auto", background: `url('${this.state.artist.dpUrl || "../../../../images/user.png"}')`, borderRadius: "100%", backgroundPosition: "center",backgroundSize:"contain" }}>
                                    </div>
                           
                                </div>
                                <div className="col-sm-4 col-sm-offset-4">

                                </div>
                                
                            </div>

                                <center>
                                    <h2 style={{ textTransform: "capitalize" }}>{this.state.product.title} </h2>
                                    <p style={{ textTransform: "capitalize" }}>Paid Euro{this.state.product.price}</p>

                                </center>
                        </li>
                        <li>
                            <div className="list-box-listing">
                                {/* <div className="list-box-listing-img"><a href="#"><img src={`${this.state.artist.dpUrl}`} alt="" /></a></div> */}
                                <div className="list-box-listing-content">
                                    <div className="inner" style={{ textTransform: "capitalize" }}>

                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col-sm-12">
                                                    <h3><a href="#" style={{ textTransform: "capitalize" }}>Description</a></h3>
                                                {/* <p style={{ textTransform: "capitalize" }}>{this.state.artist.bio}</p> */}
                                                <p style={{ textTransform: "capitalize" }}>{this.state.product.description}</p>
                                            </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Full name</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.firstName} {this.state.artist.lastName}</p>
                                                </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>Billing Address </h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.billing}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>Email</h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.email}</p>

                                            </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>Shipping Address </h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.shipping}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>Delivered </h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.delivered?"Yes":"No"}</p>

                                            </div>
                                                <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>State</h3>
                                                    <p style={{ textTransform: "capitalize" }}>{this.state.artist.state}</p>
                                                </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>city</h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.city}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                    <h3 style={{ textTransform: "capitalize" }}>Organization</h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.organization}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h3 style={{ textTransform: "capitalize" }}>phone</h3>
                                                <p style={{ textTransform: "capitalize" }}>{this.state.artist.phone}</p>

                                            </div>
                                        </div>

                                        <div className="star-rating" data-rating="3.5">
                                            {/* <div className="rating-counter">{this.state.product.views} Views  </div> */}

                                            {/* <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="buttons-to-right">
                                <a href="#" className="button gray"><i className="sl sl-icon-note"></i> Edit</a>
                                <a href="#" className="button gray"><i className="sl sl-icon-close"></i> Delete</a>
                            </div> */}
                        </li>


                    </ul>
                </div>
            </div>
            : <div></div>
        );
    }
}

export default Singlebuyer;