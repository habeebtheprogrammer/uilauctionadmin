import React, { Component } from 'react';
import Sidebar from "./sidebar"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { connect } from "react-redux"
import { bindActionCreator } from "redux"
import setAuthorizationToken from "../auth"
import auth from "../../reducer/index"
import $ from "jquery"
import Register from "../register/index"
import Login from "../login/index"
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}
class Navbar extends Component {


    logout() {
        localStorage.removeItem("jwToken");
        setAuthorizationToken(false);
        var url = window.location.pathname;
        window.location.assign("/")
    }
    render() {
        console.log(this.props)
        return (
            <div className="setnav" >
                <header id="header-container" className="fixed fullwidth dashboard">

                    <div id="header" className="not-sticky">
                        <div className="container">

                            <div className="left-side">

                                <div id="logo">
                                    <a href="/"><img src="../../../../images/art6.jpg" alt="" /></a>
                                    <a href="/admin/dashboard" className="dashboard-logo"><img src="../../../images/art6.jpg" alt="" /> <div style={{paddingTop:"20px",color:"#fff",float:'right'}}><div style={{marginTop:"10px",fontSize:"1.3em"}}> Bidders</div></div></a>
                                </div>

                                <div className="mmenu-trigger">
                                    <button className="hamburger hamburger--collapse" type="button">
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button>
                                </div>
                                <nav id="navigation" className="style-1">
                                    <ul id="responsive">

                                      
                                        <li><a href="#">Marketplace</a>
                                            <ul>
                                                <li><a href="/admin/dashboard/marketplace?orderby=new_arrival">New arrival</a></li>
                                                <li><a href="/admin/dashboard/marketplace?orderby=most_viewed">Most Viewed</a></li>
                                                <li><a href="/admin/dashboard/marketplace">All Items</a></li>
                                                <li><a href="/admin/dashboard/post_item">Post an item</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/admin/dashboard/newsletter">Newsletter</a>
                                        </li>
                                        <li><a href="/admin/dashboard/buyers">Buyers request</a>
                                        </li>
                                        <li><a href="/admin/dashboard/search">Search</a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="clearfix"></div>
                            </div>
                            <div className="right-side">
                                <div className="header-widget">

                                    <div className="user-menu">
                                        <div className="user-name"><span><img src="../../../images/user.png" alt="" /></span>My Account</div>
                                        <ul>
                                            <li><a href="/admin/dashboard"><i className="sl sl-icon-settings"></i> Dashboard</a></li>
                                            <li><a href="/admin/dashboard/support/bidders"><i className="sl sl-icon-envelope-open"></i> Support</a></li>
                                            <li><a href="/admin/dashboard/campaign"><i className="fa fa-calendar-check-o"></i> Message</a></li>
                                            <li><a href="#" onClick={this.logout}><i className="sl sl-icon-power" ></i> Logout</a></li>
                                        </ul>
                                    </div>

                                    <a href="/admin/dashboard/post_item" className="button border with-icon">Post an item <i className="sl sl-icon-plus"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>

                </header>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navbar);