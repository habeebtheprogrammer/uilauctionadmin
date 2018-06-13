import React, { Component } from 'react';
import moment from "moment"
import axios from "axios"
import apiUrl from "../../config"
class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }
    componentWillMount() {
        let search = window.location.search
        if (search) {
            axios.get(`${apiUrl}/api/orderevents${search}`).then((res) => {
                if (res.data.events) {
                    console.log(res)
                    this.setState({ events: res.data.events, response: true })
                } else console.log(res)
            })
        } else
        axios.get(`${apiUrl}/api/events`).then((res) => {
            if (res.data.events) {
                console.log(res)
                this.setState({ events: res.data.events, response: true })
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
                {this.state.events.map((event) => (
                    <div className="col-lg-4 col-md-6">
                        <a href={`${this.props.match.url}/${event._id}`} className="listing-item-container compact">
                            <div className="listing-item">
                                <img src={event.imgUrl} alt="" />
                                <div className="listing-item-details" >
                                    <ul>
                                        <li>{moment(event.checkedDate).format("LL")}</li>
                                    </ul>
                                </div>
                                <div className="listing-item-content" >
                                    <div className="numerical-rating high" data-rating="5.0"></div>
                                    <h3 style={{ textTransform: "capitalize" }}>{this.substr(event.title,30)}</h3>
                                    <span style={{ textTransform: "capitalize" }}>{event.location}</span>
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

export default Event;