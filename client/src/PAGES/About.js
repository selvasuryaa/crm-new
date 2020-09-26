import React from "react";
export default function About() {
	return (
		<div>
			<p style={{ fontSize: "20px" }}>
				<h2 style={{ textAlign: "center" }}>About</h2>
				<p style={{ textAlign: "center", color: "blue" }}>
					React CRM Demo App
				</p>
				<blockquote>
					This demo app is not a real application. There is a
					real API as back-end service behind the scene. Any data
					update (create or update record) will be stored after refresh. The main purpose of this demo is just a
					proof of concept.
				</blockquote>
			</p>
		</div>
	);
}
