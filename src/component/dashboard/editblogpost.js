import React, { Component } from 'react';
import data from "../../data"
import axios from "axios"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import YouTube from "react-youtube"
import validator from "validator"
class Editblogpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            news: {},
            category: "",
            description: "",
            youtubelink: "",
            error: {},
            progress: "",
            success: "",
            fileName: "",
            token: localStorage.getItem("jwToken")
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
    }
    typing(e) {
        if (e.target.name === "youtubelink"&& validator.isURL(e.target.value)) {
            var link = e.target.value;
            var u = new URL(link)
            let qlink = new URLSearchParams(u.search)
            let url = qlink.get("v")
            this.setState({ youtubelink: url })
        } else
            this.setState({
                [e.target.name]: e.target.value
            })
    }

    componentWillMount() {
        axios.get(`${apiUrl}/api/newsbyid?id=${this.props.match.params.id}`).then((res) => {
            // this.props.setUserProfile(res.data.data)
            if (res.data.success) {
                this.setState({ news: res.data.success });
            }
        })
    }
    submitform(e) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        const { category, description, title, youtubelink } = this.state
        this.setState({ isLoading: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/editpost`, { category, description, youtubelink, title, token, id: this.props.match.params.id }).then((res) => {
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
            this.state.news.title ?
                <div className="">
                    <form onSubmit={this.submitform}>


                        <div className="row">
                            {this.state.news.youtubelink ?
                                <YouTube
                                    videoId={this.state.news.youtubelink}
                                    className="lgheight"
                                    opts={{
                                        width: '100%',
                                        playerVars: { // https://developers.google.com/youtube/player_parameters,
                                            autoplay: 0
                                        }
                                    }}
                                    onReady={this._onReady}
                                />
                                : 
                                <div className="col-md-4 col-md-offset-4" style={{ background: `url('${this.state.news.imgUrl}') no-repeat`, height: "250px", backgroundSize: "contain" }}>

                                </div>
                            }
            
                            <div className="col-lg-12">

                                <div id="add-listing" className="separated-form">

                                    <div className="add-listing-section">

                                        <div className="add-listing-headline">
                                            <h3><i className="sl sl-icon-doc"></i> Basic Informations</h3>
                                        </div>

                                        <div className="row with-forms">
                                            <div className="col-md-6">
                                                <h5> Blog post title <i className="tip" data-tip-content="Name of your business"></i></h5>
                                                <input name="title" placeholder={this.state.news.title} onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5> Youtube link </h5>
                                                <input name="youtubelink" onChange={this.typing} className="search-field" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Category</h5>
                                                <select onChange={this.typing} name="category" className="" >
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
                                            <textarea placeholder={this.state.news.description} onChange={this.typing} className="WYSIWYG" name="description" cols="40" rows="3" id="summary" spellcheck="true"></textarea>
                                        </div>






                                    </div>


                                </div>
                            </div>

                        </div>

                        <div style={{ color: "#f91942", marginLeft: "3px" }}>{this.state.error.server ? <small>{this.state.error.server}</small> : null}</div>

                        <button type="submit" className="button preview" disabled={this.state.isLoading ? true : false}  >
                            {this.state.isLoading ? <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Loading</span> : "Save"}

                        </button>
                    </form>
                </div > : <div></div>
        );
    }
}

export default Editblogpost;