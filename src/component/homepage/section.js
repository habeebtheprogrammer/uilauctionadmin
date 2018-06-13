import React, { Component } from 'react';

class Section extends Component {
    render() {
        return (
            <div>
                {/* <a href="listings-half-screen-map-list.html" className="flip-banner parallax margin-top-65" data-background="images/slider-bg-02.jpg" data-color="#f91942" data-color-opacity="0.85" data-img-width="2500" data-img-height="1666">
                    <div className="flip-banner-content">
                        <h2 className="flip-visible">Expolore top-rated attractions nearby</h2>
                        <h2 className="flip-hidden">Browse Services <i className="sl sl-icon-arrow-right"></i></h2>
                    </div>
                </a> */}
                <div className="container">

                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2 className="headline centered margin-top-80">
                                Discover services and get inspired
				<span className="margin-top-25">Explore some of the best services from around the world from our vendors and provider.  Book an appointment online and get inspired.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="row icons-container">
                        <div className="col-md-4">
                            <div className="icon-box-2 with-line">
                                <i className="im im-icon-Map2"></i>
                                <h3>Find Interesting Place</h3>
                                <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus tellus ut, convallis eros sollicitudin turpis.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="icon-box-2 with-line">
                                <i className="im im-icon-Mail-withAtSign"></i>
                                <h3>Contact a Few Vendor</h3>
                                <p>Maecenas pulvinar, risus in facilisis dignissim, quam nisi hendrerit nulla, id vestibulum metus nullam viverra porta purus.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="icon-box-2">
                                <i className="im im-icon-Checked-User"></i>
                                <h3>Book an appointment</h3>
                                <p>Faucibus ante, in porttitor tellus blandit et. Phasellus tincidunt metus lectus sollicitudin feugiat pharetra consectetur.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Section;
