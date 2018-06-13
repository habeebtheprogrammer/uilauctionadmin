import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
class Editproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            product:{},
            industry: "",
            description: "",
            sdescription: "",
            price: "",
            nprice: "",
            mprice:"",
            error: {},
            progress: "",
            approved: "",
            success: "",
            sfee2:"",
            sfee:"",
            fileName: "",
            token: localStorage.getItem("jwToken")
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount() {
        axios.get(`${apiUrl}/api/productbyid?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ product: res.data.success,approved:res.data.success.approved });
            }
        })
    }
    submitform(e) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        const { industry, description, title, price, sfee, sfee2,sdescription,nprice,mprice,approved} = this.state
        this.setState({ isLoading: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/editproduct`, { industry, sdescription,description,approved,sfee,sfee2, title,price,nprice,mprice,token,id:this.props.match.params.id }).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    setTimeout(() => window.location.reload(), 1000)
                } else {
                    console.log(res)
                }
                this.setState({ isLoading: false })
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
           this.state.product.title?
            <div className="">
                <form onSubmit={this.submitform }>
                    <div className="row">
                            <div className="col-md-4 col-md-offset-4" style={{ background: `url('${this.state.product.imgUrl}') no-repeat`, height:"250px",backgroundSize:"contain" }}>

                        </div>
                        <div className="col-lg-12">

                            <div id="add-listing" className="separated-form">

                                <div className="add-listing-section">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                                    </div>

                                    <div className="row with-forms">
                                        <div className="col-md-6">
                                            <h5>  Title </h5>
                                            <input  name="title" placeholder={this.state.product.title} onChange={this.typing} className="search-field" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Genre</h5>
                                        <select  onChange={this.typing} name="industry" className="" >
                                                <option >Select Category</option>
                                                {data.industry.map((industry) => (
                                                    <option value={industry.title}>{industry.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                            <div className="col-md-12">
                                                <h5> Price(€) </h5>
                                                <input  name="price" placeholder={`${this.state.product.price}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Pricing for members(€{this.state.product.price + (3.4 * this.state.product.price / 100) + 0.35}) </h5>
                                                <input name="mprice" placeholder={`${this.state.product.mprice}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Pricing non members(€{this.state.product.price+(20*this.state.product.price/100)+0.35}) </h5>
                                                <input name="nprice" placeholder={`${this.state.product.nprice}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Shipping Fee (International) </h5>
                                                <input name="sfee2" placeholder={`${this.state.product.sfee2}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Shipping Fee (National)</h5>
                                                <input name="sfee" placeholder={`${this.state.product.sfee}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Shipping Description</h5>
                                                <input name="sdescription" placeholder={`${this.state.product.sdescription}`} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                    </div>


                                </div>
                                <div className="add-listing-section margin-top-45">

                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-docs"></i> Details</h3>
                                    </div>

                                    <div className="form">
                                        <h5>Description</h5>
                                                <textarea placeholder={this.state.product.description}   onChange={this.typing} className="WYSIWYG" name="description" cols="40" rows="3" id="summary" spellcheck="true"></textarea>
                                    </div>
                                    
                                   
                                    




                                        <label>
                                            <input type="checkbox" value={this.state.approved} checked={this.state.approved}  onChange={()=>this.setState({approved:!this.state.approved})}  name="approved" style={{width:"inherit",height:"inherit"}}/>
                                            Approve item for display
                                        </label>
                                </div>

                                       
                            </div>
                        </div>

                    </div>
                      
                        <div style={{ color: "#f91942", marginLeft: "3px" }}>{this.state.error.server ? <small>{this.state.error.server}</small> : null}</div>

                        <button type="submit" className="button preview" disabled={this.state.isLoading ? true : false}  >
                            {this.state.isLoading ? <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Loading</span> : "Save"}

                        </button>
                </form>
                
            </div >:<div></div>
        );
    }
}

export default Editproduct;