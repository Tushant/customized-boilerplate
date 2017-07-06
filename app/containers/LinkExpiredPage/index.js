/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";

import messages from "./messages";

import trash from "assets/img/trash.jpg";



const LinkExpired = () => {
	return (
		<div className="container">

<div className="text-center box-center" style={{maxWidth:'408px', margin:'0 auto'}}>
<img src={trash} alt="radar" className="img-responsive"  />
		<h1 className="thin">The page is no longer exist,
Now it is in our trash</h1>
<button className="btn btn-link" href="javascript:history.back()">Return to previous page</button>

</div>

<div className="sticky-btm-right">

<span className="text-xlg bold dim-1">404</span>

</div>

</div>

		);
}

export default LinkExpired;

// const NotFound = () => {

// }