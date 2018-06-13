import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import jwt from "jsonwebtoken"
import countries from "../countries"
class Editmembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist:{},
            email: "",
            firstName: "",
            lastName: "",
            company: false,
            username: "",
            phone: "",
            dob: "",
            address: "",
            city: "",
            selectIndustry: "",
            selectCategory: "",
            street: "",
            state: "",
            country: "",
            membership: "",
            password: "",
            error: {},
            progress: false,
            success: "",
            media:[]
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
    }
        componentWillMount() {
            axios.get(`${apiUrl}/api/artist?id=${this.props.match.params.id}`).then((res) => {
                console.log(res)
                
                if (res.data.user) {
                    this.setState({ artist: res.data.user, media: res.data.media });
                } else this.setState({ artist: false })
            })
        }

        
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitform(e) {
        e.preventDefault();
        let token = jwt.sign(this.state, "o1l2a3m4i5d6e")
        this.setState({ progress: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/editmembers`, { token: token,id:this.state.artist._id }).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    setTimeout(() => window.location.reload(), 2000)
                } else {
                    console.log(res)
                }
                this.setState({ progress: false })
            }, 1000);

        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false, error: { server: "Please try again later. an error has occured" } })
            }, 1000);
        })
    }

    render() {
        console.log(this.state)
        return (
            this.state.artist.email?
            <div className="">
                <form onSubmit={this.submitform}>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4" style={{ background: `url('${this.state.artist.dpUrl}') no-repeat`, height: "250px", backgroundSize: "contain" }}>

                        </div>
                        <div className="col-lg-12">
                        
                            <div id="add-listing" className="separated-form">

                                <div className="add-listing-section">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                                    </div>
                                 
                                    <div className="row with-forms">
                                        <div className="col-md-6">
                                            <h5> First Name </h5>
                                            <input  name="firstName" placeholder={this.state.artist.firstName} onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Last Name </h5>
                                                <input  name="lastName" placeholder={this.state.artist.lastName} onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <h5> Username </h5>
                                                <input  name="username" placeholder={this.state.artist.username} onChange={this.typing} className="search-field" type="text" />
                                        </div> */}
                                        <div className="col-md-6">
                                            <h5> Telephone </h5>
                                                <input  name="phone" placeholder={this.state.artist.phone} onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <h5> Email address </h5>
                                                <input  name="email" onChange={this.typing} placeholder={this.state.artist.email} className="search-field" type="email" />
                                        </div> */}
                                        {/* <div className="col-md-6">
                                            <h5> Password </h5>
                                                <input  name="password" onChange={this.typing} placeholder={this.state.artist.password} className="search-field" type="password" />
                                        </div> */}
                                        <div className="col-md-6">
                                            <h5> Date of Birth</h5>
                                                <input  name="dob" onChange={this.typing} placeholder={this.state.artist.dob} className="search-field" type="text" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <h5> Street number</h5>
                                                <input  name="street" onChange={this.typing} placeholder={this.state.artist.street}className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> City</h5>
                                                <input  name="city" onChange={this.typing} placeholder={this.state.artist.city} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> State</h5>
                                                <input  name="state" onChange={this.typing} placeholder={this.state.artist.state}className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Company</h5>
                                            <select name="company"  onChange={this.typing} className="" >
                                                <option >Please select</option>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Membership</h5>
                                            <select name="membership"  onChange={this.typing} className="" >
                                                <option >Please select</option>
                                                <option value="artist">artist</option>
                                                <option value="supporters">supporters</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Country</h5>
                                            <select name="country"  onChange={this.typing} className="" >
                                                <option className="" >Please select </option>
                                                {countries.map((country, key) => (
                                                    <option key={key} className="" value={country.country}>{country.country}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <h5>Industry</h5>
                                            <select name="selectIndustry"  onChange={this.typing} className="" >
                                                <option className="" >Please select </option>
                                                {data.industry.map((industry, key) => (
                                                    <option key={key} className="grey-text text-darken-2" value={key}>{industry.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Genre</h5>
                                            <select name="selectCategory"  onChange={this.typing} className="" >
                                                {this.state.selectIndustry !== "" && this.state.selectIndustry !== "NA" ?
                                                    data.industry[this.state.selectIndustry].categories.map((category, key) => (
                                                        <option key={key} className="grey-text text-darken-2" value={category.title}>{category.title}</option>
                                                    )) : null}
                                            </select>
                                        </div>
                             
                                    </div>
                                    <button type="submit" className="button preview" disabled={this.state.progress?true:false}> 
                                        {this.state.progress ? <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Loading</span> : "Continue"}

                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>
                    <p style={{ color: "#f91942", marginLeft: "3px" }}>{this.state.error.server ? <small>{this.state.error.server}</small> : null}</p>
                    <p style={{ color: "green", marginLeft: "3px" }}>{this.state.success ? <small>{this.state.success.server}</small> : null}</p>


                    <style>{`
                    // .dashboard-content > div  >  div{
                    //     display:block !important
                    // }
                    `}
                    </style>

                </form>
            </div >
            :<div></div>
        );
    }
}

export default Editmembers;