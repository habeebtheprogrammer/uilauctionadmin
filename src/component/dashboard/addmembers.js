import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import jwt from "jsonwebtoken"
import countries from "../countries"
class Addmembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
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
        axios.post(`${apiUrl}/api/payment_successful`, { token: token }).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    // setTimeout(() => window.location.reload(), 1000)
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
            <div className="">
                <form onSubmit={this.submitform}>
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="notification notice large margin-bottom-55">
                                <h4>Signup a new user 🙂</h4>
                                <p>A link will be sent to every members added from this console to verify their email address. members that are yet to verify their email address will be found in the pending activation section </p>
                            </div>

                            <div id="add-listing" className="separated-form">

                                <div className="add-listing-section">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                                    </div>
                                    {/* <Row>
                                        <Col s={6}>
                                            <label>First Name  {this.state.firstName ? null : <span>*</span>}</label>
                                            <input name="firstName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Last Name {this.state.lastName ? null : <span>*</span>}</label>
                                            <input name="lastName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>Username  {this.state.usuccess ? null : <span>*</span>}  {this.state.uerror ? <span style={{ padding: "0px 12px" }} className="red-text">{this.state.uerror}</span> : null}
                                                {this.state.usuccess && this.state.username && !this.state.uerror ? <span style={{ padding: "0px 12px" }} className="green-text">{this.state.usuccess}  is available</span> : null}
                                            </label>
                                            <input name="username" onChange={this.typingUsername} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Telephone  {this.state.phone ? null : <span>*</span>}</label>
                                            <input name="phone" onChange={this.typing} type="number" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={12}>

                                            <label>Email Address  {this.state.success.email ? null : <span>*</span>}   {this.state.error.email ? <span style={{ padding: "0px 12px", }} className="red-text">{this.state.error.email}</span> : null}
                                                {this.state.success.email && this.state.email ? <span style={{ padding: "0px 12px" }} className="green-text">{this.state.success.email}  is available</span> : null}
                                            </label>
                                            <input name="email" onChange={this.typingEmail} type="email" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Date of Birth  {this.state.dob ? null : <span>*</span>}</label>
                                            <input name="dob" onChange={this.typing} type="date" className="input" required="required" title="" />
                                        </Col>

                                        <Col s={6}>

                                            <label>Street + Number {this.state.street ? null : <span>*</span>}</label>
                                            <input name="street" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>City {this.state.city ? null : <span>*</span>}</label>
                                            <input name="city" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>State {this.state.state ? null : <span>*</span>}</label>
                                            <input name="state" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>Password  {this.state.password ? null : <span>*</span>}</label>
                                            <input name="password" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>Confirm Password  {this.state.cpassword ? null : <span>*</span>}</label>
                                            <input name="cpassword" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Input s={6} type='select' name="company" label="Company" defaultValue='0' onChange={this.typing.bind(this)}>
                                            <option className="grey-text text-darken-2" >Please select </option>
                                            <option className="grey-text text-darken-2" value={true}>Yes</option>
                                            <option className="grey-text text-darken-2" value={false}>No</option>
                                        </Input>
                                        <Input s={6} type='select' name="country" label="Country" defaultValue='0' onChange={this.typing.bind(this)}>
                                            <option className="grey-text text-darken-2" >Please select your country</option>
                                            {countries.map((country, key) => (
                                                <option key={key} className="grey-text text-darken-2" value={country.country}>{country.country}</option>
                                            ))}
                                        </Input>
                                        <Col s={6}>

                                            <label>
                                                <input style={{ position: "inherit", opacity: "1", left: "0", width: "inherit", position: "relative" }} name="tos" onChange={() => { this.setState({ tos: !this.state.tos }, () => this.validation()); }} type="checkbox" className="input" required="required" title="" /> By signing up you agree with our <a href="/terms-and-condition">Terms and Condition</a>
                                            </label>
                                        </Col>
                                    </Row> */}
                                    <div className="row with-forms">
                                        <div className="col-md-6">
                                            <h5> First Name <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="firstName" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Last Name <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="lastName" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Username <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="username" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Telephone <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="phone" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Email address <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="email" onChange={this.typing} className="search-field" type="email" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Password <i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="password" onChange={this.typing} className="search-field" type="password" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> Date of Birth<i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="dob" onChange={this.typing} className="search-field" type="date" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <h5> Street number<i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="street" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> City<i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="city" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5> State<i className="tip" data-tip-content="this field is compulsory"></i></h5>
                                            <input required name="state" onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Company</h5>
                                            <select name="company" required onChange={this.typing} className="" >
                                                <option >Please select</option>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                     
                                        <div className="col-md-6">
                                            <h5>Country</h5>
                                            <select name="country" required onChange={this.typing} className="" >
                                                <option className="" >Please select </option>
                                                {countries.map((country, key) => (
                                                    <option key={key} className="" value={country.country}>{country.country}</option>
                                                ))}
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
        );
    }
}

export default Addmembers;