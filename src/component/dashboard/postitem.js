import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
class Postitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            price: "",
            billing: "",
            phone: "",
            stock: "",
            email: "",
            error: {},
            isLoading:false,
            progress: "",
            success: "",
            industry:"",
            sfee: "",
            sfee2:"",
            sdescription:"",
            fileName: "",
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
        const { title, price, description, billing, phone, sfee, sfee2, sdescription, stock, email ,industry} = this.state
        console.log(this.state)
        return (
            <div className="">
           
                <FileUpload options={{
                    baseUrl: `${apiUrl}/api/uploadProduct`,
                    param: {
                        fid: 0
                    },
                    chooseAndUpload: false,
                    accept: "image/*",
                    fileFieldName: "product",
                    uploadSuccess: function (resp) {
                        if (resp.error) this.setState({ error: resp.error, progress: "", fileName: "", isLoading: false })
                        else  this.setState({ success:"Item uploaded successfully", progress: "", fileName: "",isLoading:false })
                    }.bind(this),
                    uploadError: function (err) {
                        this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "", isLoading: false })
                    }.bind(this),
                    chooseFile: function (files) {
                        console.log('you choose', typeof files == 'string' ? files : files[0].name)
                        this.setState({ fileName: files[0].name, isLoading: false })
                    }.bind(this),
                    uploadFail: function (err) {
                        console.log(err)
                        this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "", isLoading: false})
                    }.bind(this),
                    uploading: function (progress) {
                        this.setState({ progress: progress.loaded / progress.total, error: {},isLoading:true })
                        console.log("loading...", progress.loaded / progress.total, "%")
                    }.bind(this),

                    paramAddToField: { token: token, title, price, sfee, sfee2, sdescription, description,industry, billing, phone, stock, email }
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
                                            <h5> Title </h5>
                                            <input name="title" type="text" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Price (Euro)</h5>  
                                            <input name="price" type="number" onChange={this.typing} className="input" required="required" title="" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Shipping fees (international)</h5>
                                            <input name="sfee2" type="number" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5>Shipping fees (national)</h5>
                                            <input name="sfee" type="number" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-12">
                                            <h5>Description about Shipping</h5>
                                            <input name="sdescription" type="text" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5>Number of items available</h5>
                                            <input name="stock" type="number" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Phone</h5>
                                            <input name="phone" type="number" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5> Email </h5>
                                            <input name="email" type="email" onChange={this.typing} className="input" required="required" title="" />

                                        </div>
                                        <div className="col-md-6">
                                            <h5>Genre</h5>
                                            <select onChange={this.typing} name="industry" className="" >
                                                <option >Select Category</option>
                                                {data.industry.map((industry) => (
                                                    <option value={industry.title}>{industry.title}</option>
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
                                        <textarea name="description" onChange={this.typing} required="required" cols="30" rows="10"></textarea>
                                    </div>






                                </div>


                            </div>
                        </div>

                    </div>

                    <div style={{ color: "#f91942", marginLeft: "3px" }}>
                        {this.state.success ? <p className="green-text darken-1 center-align" style={{ color: "green" }}><small>{this.state.success}</small></p> : null}
                        {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                    </div>

               
                    {this.state.fileName !== "" ? <small className="grey-text">{this.state.fileName} <br /></small> :null}

                  
                    <button ref="chooseBtn" className="button preview" >
                        upload image
                                        </button>
                    <button ref="uploadBtn" className="button preview" disabled={this.state.fileName !== "" ? false : true}>
                        {this.state.isLoading ? <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Loading</span> : "Upload"}
                    </button>
                </FileUpload>
          
            </div >
        );
    }
}

export default Postitem;