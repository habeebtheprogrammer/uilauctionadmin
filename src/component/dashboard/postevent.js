import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
class Postevent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checkedDate: new Date(),
            title: "",
            location: "",
            description: "",
            link: "",
            startTime: "",
            stopTime: "",
            error: {},
            checkedDate: "",
            events: [],
            progress: "",
            success: "",
            fileName: "",
            isLoading:false,
            industry:"",
            token: localStorage.getItem("jwToken")
        }
        this.typing = this.typing.bind(this)
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentWillMount() {

    }


    render() {
        let token = window.localStorage.getItem("jwToken")
        const { title, price, description, billing, phone, stock, email } = this.state
        console.log(this.state)
        var time = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"]

        return (
            <div className="">
                <FileUpload options={{
                    baseUrl: `${apiUrl}/api/uploadEvent`,
                    param: {
                        fid: 0
                    },
                    chooseAndUpload: false,
                    accept: "image/*",
                    fileFieldName: "event",
                    uploadSuccess: function (resp) {
                        if (resp.error) this.setState({ error: resp.error, progress: "", fileName: "", isLoading: false})
                        else this.setState({ success: "Event uploaded successfully", progress: "", fileName: "", isLoading: false})
                    }.bind(this),
                    uploadError: function (err) {
                        this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "", isLoading: false })
                    }.bind(this),
                    chooseFile: function (files) {
                        console.log('you choose', typeof files == 'string' ? files : files[0].name)
                        this.setState({ fileName: files[0].name, isLoading: false})
                    }.bind(this),
                    uploadFail: function (err) {
                        console.log(err)
                        this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "", isLoading: false })
                    }.bind(this),
                    uploading: function (progress) {
                        this.setState({ progress: progress.loaded / progress.total, error: {} ,isLoading:true})
                        console.log("loading...", progress.loaded / progress.total, "%")
                    }.bind(this),

                    paramAddToField: { token: token,title: this.state.title, description: this.state.description, location: this.state.location, link: this.state.link, startTime: this.state.startTime, stopTime: this.state.stopTime, checkedDate: this.state.checkedDate ,industry:this.state.industry}
                }}>
                    <div className="row">

                        <div className="col-lg-12">

                            <div id="add-listing" className="separated-form">

                                <div className="add-listing-section">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                                    </div>

                                    <div className="row with-forms">
                                        <div className="col-md-6">
                                            <h5>  Title </h5>
                                            <input name="title" type="text" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Phone</h5>
                                            <input name="location" onChange={this.typing.bind(this)} type="text" className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Link to ticket</h5>
                                            <input name="link" onChange={this.typing.bind(this)} placeholder="http://" type="text" className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Location </h5>
                                            <input name="location" onChange={this.typing.bind(this)} type="text" className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5>Category</h5>
                                            <select required onChange={this.typing} name="industry" className="" >
                                                <option >Select Category</option>
                                                {data.industry.map((industry) => (
                                                    <option value={industry.title}>{industry.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                          <div className="col-md-6">
                                            <h5> Event Date </h5>
                                            <input name="checkedDate" onChange={this.typing.bind(this)} type="date" className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5>Start time</h5>
                                            <select onChange={this.typing} name="startTime" className="" >
                                                <option className="grey-text text-darken-2" >closed</option>
                                                {time.map((time, key) => (
                                                    <option key={key} onChange={this.typing.bind(this)} className="grey-text text-darken-2" value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Stop time</h5>
                                            <select onChange={this.typing} name="stopTime" className="" >
                                                <option className="grey-text text-darken-2" >duration</option>
                                                {time.map((time, key) => (
                                                    <option key={key} onChange={this.typing.bind(this)} className="grey-text text-darken-2" value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                

                                </div>
                                <div className="add-listing-section margin-top-45">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-docs"></i> Details</h3>
                                    </div>

                                    <div className="form">
                                        <h5>Description</h5>
                                        <textarea onChange={this.typing.bind(this)} name="description" required="required" cols="30" rows="10"></textarea>
                                    </div>






                                </div>


                            </div>
                        </div>

                    </div>

                    <div style={{ color: "#f91942", marginLeft: "3px" }}>
                        {this.state.success ? <p className="green-text darken-1 center-align" style={{color:"green"}}><small>{this.state.success}</small></p> : null}
                        {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                    </div>

               
                    {this.state.fileName !== "" ? <small className="grey-text">{this.state.fileName} <br /></small> :
                        <button ref="chooseBtn" className="button custom" >
                            upload image
                                        </button>}
                    <button ref="uploadBtn" className="button custom" disabled={this.state.fileName !== "" ? false : true} >
                        {this.state.isLoading ? <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Loading</span> : "Upload"}

                    </button>
                  
              
                </FileUpload>
            
            </div >
        );
    }
}

export default Postevent;