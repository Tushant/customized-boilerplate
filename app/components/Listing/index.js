import React from "react";

const Listing = () => {
  return (
    <section className="oh">
      <div className="row">
        <div className="col-md-6 orangeGrad">
          <div>
            <h3>List Your Property </h3>
            <p>
              Two sentences that support the Headline and tell why it is good to list in xceltrip
            </p>
            <button className="button1">Sign Up</button>
          </div>
        </div>
        <div className="col-md-6 blueGrad">
          <div>
            <h3>Become An Agent </h3>
            <p>
              Get the benefits of being agent of Xeltrip and Keep geting your percentage lifetime
            </p>
            <div className="align-right">
              <button
                className="button2"
                onClick={() => console.log("lets go")}
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
