import React, { Component } from 'react';
import moment from "moment"
import apiUrl from "../../config"
import axios from "axios"
import jwt from "jsonwebtoken"
class Pending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success:"",
            error:"",
            pending:[]
        }
        this.resend = this.resend.bind(this)
        this.deletepost = this.deletepost.bind(this)
    }
    componentWillMount(){
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/pendingActivation?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ pending: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }
    resend(user){
       var token= jwt.sign({email:user.email},"o1l2a3m4i5d6e");
        axios.post(`${apiUrl}/api/activateuser`,{token:token}).then((res)=>{
           if(res.data.success) window.location.reload();
           else this.setState({error:res.data.error})
        }).catch((err)=>this.setState({"error":"Error"}))
    }
    deletepost(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deleteartist`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.reload()
            }
        })
    }
    render() {
        console.log(this.props)
        return (

            <div className="row">

                <div className="col-lg-12 col-md-12">
                    <div className="dashboard-list-box margin-top-0">
                        <h4>Artist Listings</h4>
                        <ul>
                            {this.state.pending.map((artist) => (
                                <li>
                                    <div className="list-box-listing">
                                        <div className="list-box-listing-img"><a href="#"><img src={`../../../images/user.png`}alt="" /></a></div>
                                        <div className="list-box-listing-content">
                                            <div className="inner" style={{textTransform:"capitalize"}}>
                                                <h3><a href={`/admin/dashboard/artist/${artist._id}`} style={{ textTransform: "capitalize" }}>{artist.email}</a></h3>
                                                <span style={{ textTransform: "capitalize" }}>{artist.membership}</span>
                                                <div className="star-rating" data-rating="3.5">
                                                    <div className="rating-counter">{moment(artist.date).format("llll")}</div>
                                                    <span className="star"></span><span className="star"></span><span className="star"></span><span className="star half"></span><span className="star empty"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div className="buttons-to-right">
                                        <a href="#" onClick={(e)=>{e.preventDefault();console.log(e); this.resend(artist)}} className="button gray"><i className="sl sl-icon-note"></i> Confirm payment</a>
                                    
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

export default Pending;