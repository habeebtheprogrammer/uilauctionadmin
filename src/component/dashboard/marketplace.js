import React, { Component } from 'react';
import moment from "moment"
import axios from "axios"
import apiUrl from "../../config"
class Marketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }
    componentWillMount() {
        let search = window.location.search
        if(search){
            axios.get(`${apiUrl}/api/products${search}`).then((res) => {
                if (res.data.success) {
                    console.log(res)
                    this.setState({ products: res.data.success, response: true })
                } else console.log(res)
            })
        }else
        axios.get(`${apiUrl}/api/getProducts`).then((res) => {
            if (res.data.success) {
                console.log(res)
                this.setState({ products: res.data.success, response: true })
            } else console.log(res)
        })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        return (


            <div classNam="row">
                {this.state.products.map((product) => (
                    <div className="col-lg-4 col-md-6">
                        <a href={`${this.props.match.url}/${product._id}`}  className="listing-item-container compact">
                            <div className="listing-item">
                                <img src={product.imgUrl} alt="" />
                                <div className="listing-item-details" >
                                    <ul>
                                        <li>{moment(product.date).format("LL")}</li>
                                    </ul>
                                </div>
                                <div className="listing-item-content" >
                                    <div className="numerical-rating high" data-rating="5.0"></div>
                                    <h3 style={{ textTransform: "capitalize" }}>{this.substr(product.title,30)}</h3>
                                    <span style={{ textTransform: "capitalize" }}>${product.price}</span>
                                </div>
                                <span className="like-icon"></span>
                            </div>
                        </a>
                    </div>
                ))}

            </div>
        );
    }
}

export default Marketplace;