import React, { Component } from 'react';
import Navbar from "../navbar/dashboard"
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"
import { bindActionCreator } from "redux"
import setAuthorizationToken from "../auth"
import Orders from "./orders"
import Dispute from "./dispute"
import apiUrl from "../../config"
import axios from "axios"
import Video from "./video"
import Privateroute from "../../privateroute"
import Audio from"./audio"
import Review from "./review"
import auth from "../../reducer/index"
import Messages from "./messages"
import Profile from "./profile"
import Search from "./search"
import Event from "./event"
import Pending from "./pending"
import Marketplace from "./marketplace"
import Artist from "./artist"
import Newsletter from "./newsletter"
import Supporters from "./supporters"
import Addblogpost from './addblogpost';
import Addmembers from './addmembers';
import Singlelisting from './single-listing';
import Singlevideo from './singlevideo';
import Singleaudio from './singleaudio';
import Editmembers from './editmembers';
import Singleevent from './singleevent';
import Editblogpost from './editblogpost';
import Editevent from './editevent';
import Support from "./support"
import Singleitem from './singleitem';
import Singlependingitems from './singlependingitems';
import Pendingitems from './pendingitems';
import Editproduct from './editproduct';
import Buyers from './buyers';
import Postitem from "./postitem"
import Postevent from './postevent';
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            error: "",
            isLoading: "",
            members:[],
            events: "",
            products: "",
            pusers: "",
            pproducts: "",
            news:"",
            newArtist: [],
            newProducts: [],
            artists:[],
            supporters:"",
            pending:[],
            audios:[],
            latestproducts:[],
            videos:[],

        }
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/members?token=${token}`).then((res) => {
            if (res.data.users) {
                this.setState({ members: res.data.users, latestproducts:res.data.products})
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/getNewArtists?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ newArtist: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countArtists?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ artists: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countSupporters?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ supporters: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
     
        axios.get(`${apiUrl}/api/countEvents?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ events: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countProduct?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ products: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countPendingActivation?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ pusers: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countPendingProduct?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ pproducts: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
        axios.get(`${apiUrl}/api/countNews?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ news: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }
    logout() {
        localStorage.removeItem("jwToken");
        setAuthorizationToken(false);
        var url = window.location.pathname;
        window.location.assign("/")
    }
    render() {
        const {  members,
            events,
            products,
            newArtist,
            newProducts,
            artists,
            supporters,
            pending,
            audios,
            videos} = this.state
        return (
            <div id="wrapper">
                <Navbar />

                <div className="clearfix"></div>
                <div id="dashboard">

                    <a href="#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> Dashboard Navigation</a>
                    <div className="dashboard-nav">
                        <div className="dashboard-nav-inner" style={{ maxHeight: "506px" }}>

                            <ul data-submenu-title="Main">
                                <li className="active"><a href={`${this.props.match.url}`}><i className="sl sl-icon-settings"></i> Dashboard</a></li>
                                {/* <li><a href={`${this.props.match.url}/blogposts`}><i className="sl sl-icon-envelope-open"></i> Blog post</a></li> */}
                              
                                <li><a href={`${this.props.match.url}/marketplace?orderby=new_arrival`}><i className="fa fa-calendar-check-o"></i> New arrival</a></li>
                                <li><a href={`${this.props.match.url}/pending-items`}><i className="fa fa-calendar-check-o"></i> Pending item(s) {this.state.pproducts? <span className="nav-tag messages">{this.state.pproducts}</span>:null}</a></li>
                            </ul>

                            <ul data-submenu-title="Listings">
                                <li><a href={`${this.props.match.url}/members`}><i className="sl sl-icon-layers"></i> Members account</a>
                              
                                </li>
                                
                                <li><a href={`${this.props.match.url}/marketplace?orderby=most_viewed`}><i className="sl sl-icon-star"></i> Most view</a></li>
                                <li><a href={`${this.props.match.url}/marketplace`}><i className="sl sl-icon-heart"></i> All items</a></li>
                                <li><a href={`${this.props.match.url}/addmembers`}><i className="sl sl-icon-plus"></i> Add Members</a></li>
                            </ul>

                            <ul data-submenu-title="Account">
                                <li><a href={`${this.props.match.url}`}><i className="sl sl-icon-user"></i> My Profile</a></li>
                                <li><a href="#" onClick={this.logout}><i className="sl sl-icon-power"></i> Logout</a></li>
                            </ul>

                        </div>
                    </div>

                    {/* <div className="dashboard-nav">
                        <div className="dashboard-nav-inner">

                            <ul data-submenu-title="Appointment">
                                <li><a href={`${this.props.match.url}/appointment`}><i className="sl sl-icon-settings"></i> Appointment  <span className="nav-tag messages">2</span></a></li>
                            </ul>

                            <ul data-submenu-title="Orders">
                                <li><a href={`${this.props.match.url}/orders`}><i className="sl sl-icon-layers"></i> Orders <span className="nav-tag messages">2</span></a>
                                </li>

                            </ul>
                            <ul data-submenu-title="Dispute">
                                <li><a href={`${this.props.match.url}/dispute`}><i className="sl sl-icon-layers"></i> Dispute</a>
                                </li>

                            </ul>
                            <ul data-submenu-title="Review">
                                <li><a href={`${this.props.match.url}/review`}><i className="sl sl-icon-layers"></i> Review </a>
                                </li>

                            </ul>
                            <ul data-submenu-title="Account">
                                <li><a href={`${this.props.match.url}`}><i className="sl sl-icon-user"></i> My Profile</a></li>
                                <li><a href="#" onClick={this.logout}><i className="sl sl-icon-power"></i> Logout</a></li>
                            </ul>

                        </div>
                    </div> */}
                    <div className="dashboard-content">
                        <Switch>
                            {/* <Route path={`${this.props.match.url}/messages`} render={(props) => <Messages />} /> */}
                            <Route path={`${this.props.match.url}/review`} component={Review} />
                            <Route path={`${this.props.match.url}/orders`} component={Orders} />
                            <Route path={`${this.props.match.url}/dispute`} component={Dispute} />
                            <Route path={`${this.props.match.url}/blog_post`} component={Addblogpost} />
                            <Route path={`${this.props.match.url}/blogposts`} component={Messages} />
                            <Route path={`${this.props.match.url}/editpost/:id`} component={Editblogpost} />
                            <Route path={`${this.props.match.url}/addmembers`} component={Addmembers} />
                            <Route path={`${this.props.match.url}/support/:id`} component={Support} />
                            <Route path={`${this.props.match.url}/buyers`} component={Buyers} />
                            <Route path={`${this.props.match.url}/search`} component={Search} />
                            <Route path={`${this.props.match.url}/newsletter`} component={Newsletter} />
                            <Route path={`${this.props.match.url}/post_event`} component={Postevent} />
                            <Route path={`${this.props.match.url}/post_item`} component={Postitem} />
                            <Route path={`${this.props.match.url}/members`} render={(props) => <Artist {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/editmembers/:id`} component={Editmembers} />
                            <Route path={`${this.props.match.url}/pending`} render={(props) => <Pending {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/supporters`} render={(props) => <Supporters {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/supporters/:id`} render={(props) => <Singlelisting {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/events`} render={(props) => <Event  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/events/:id`} render={(props) => <Singleevent  {...props} {...this.state} />} />
                            <Route path={`${this.props.match.url}/editevent/:id`} component={Editevent} />
                            <Route exact path={`${this.props.match.url}/video`} render={(props) => <Video  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/video/:id`} render={(props) => <Singlevideo  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/audio/:id`} render={(props) => <Singleaudio  {...props} {...this.state} />} />
                            <Route path={`${this.props.match.url}/audio`} render={(props) => <Audio  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/marketplace`} render={(props) => <Marketplace  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/marketplace/:id`} render={(props) => <Singleitem  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/pending-items`} render={(props) => <Pendingitems  {...props} {...this.state} />} />
                            <Route exact path={`${this.props.match.url}/pending-items/:id`} render={(props) => <Singlependingitems  {...props} {...this.state} />} />
                            <Route path={`${this.props.match.url}/editproduct/:id`} component={Editproduct} />

                            <Route path="/" render={(props) => (<Profile auth={this.props.auth} {...props} {...this.state} />)} />

                        </Switch>
                        <div className="col-md-12">
                            <div className="copyrights">© 2018 Bidders. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);
