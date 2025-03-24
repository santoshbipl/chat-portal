import React, { useEffect, useState } from "react";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";
import AppPaths from "../../lib/appPaths";
import "./feed.css";

import {
	MDBCard,
	MDBContainer,
	MDBCol,
	MDBIcon,
	MDBRipple,
	MDBRow,
} from "mdb-react-ui-kit";
import CreatePost from "./createPost";

const Feed = () => {
	const [feed, setFeed] = useState([]);
	const [modal, setModal] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [color, setColor] = useState({
		btnColor: "red",
		textColor: "white"
	})

	let current = "";
	let opacity = 1;

	if (modal) opacity = 0.5;

	const fetchFeeds = async () => {
		const feedData = await ApiConnector.sendGetRequest(ApiEndpoints.FEED);
		const temp = [];

		feedData.map((element) => {
			const obj = {
				id: element.id,
				author: element.author,
				image: element.image,
				description: element.description,
				flag: element.flag,
				likes: element.likes,
				dateposted:element.date_posted,
			};
			temp.push(obj);
		});
		setFeed(temp);
	};

	const handleLike = async (id) => {
		const req = { id: id };

		const successLikeData = await ApiConnector.sendPostRequest(
			ApiEndpoints.LIKE,
			JSON.stringify(req),
			true,
			false
		);
		if(successLikeData.flag) {
			setColor({
				btnColor: 'white',
				textColor: 'red'
			})
		} else {
			setColor({
				btnColor: 'red',
				textColor: 'white'
			})
		}
		setLikeCount(likeCount+1)
		
	};

	useEffect(() => {
		fetchFeeds();
	}, [likeCount]);

	return (
		<>
			<CreatePost
				modal={modal}
				setModal={setModal}
				fetchFeeds={fetchFeeds}
			/>
			<div
				className="check"
				id="feedbody"
				style={{ opacity: `${opacity}` }}
			>
				<button
					onClick={() => {
						setModal((prev) => !prev);
					}}
					className="btn btn-outline-warning btn-block my-1 mt-4 button"
					data-toggle="modal"
					data-target="#exampleModal"
					id="addpostbtn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="56"
						height="56"
						fill="currentColor"
						class="bi bi-plus-circle-fill"
						viewBox="0 0 16 16"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
					</svg>
				</button>

				{feed.length > 0 &&
					feed.map((ele) => {
						if(ele.flag) {
							color.btnColor = "white"
							color.textColor = "red"
						} else {
							color.btnColor = "red"
							color.textColor = "white"
						}

						return (
							<div key={ele.id}>
								<MDBContainer className="py-5">
									<MDBCard
										className="px-3 pt-3"
										style={{ maxWidth: "32rem" }}
									>
										<div id="feedcard">
											<MDBRow className="mb-3">
												<MDBCol col="6">
													<div className="d-flex flex-row align-items-center">
														<img
															src={
																ele.author.image
															}
															alt={
																ele.author
																	.full_name
															}
															style={{
																width: "50px",
																height: "50px",
																borderRadius:
																	"50%",
															}}
															className="mr-3"
														/>
														<p
															className="font-weight-bold"
															style={{
																fontSize:
																	"1.4rem",
																textTransform:
																	"capitalize",
																paddingTop:
																	"5px",
															}}
														>
															{
																ele.author
																	.full_name
															}
														</p>
													</div>
												</MDBCol>
											</MDBRow>
											<MDBRipple
												className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
												rippleTag="div"
												rippleColor="light"
											>
												<img
													src={ele.image}
													className="img-fluid"
												/>
												<div
													className="mask"
													style={{
														backgroundColor:
															"rgba(251, 251, 251, 0.15)",
													}}
												></div>
											</MDBRipple>
											<p>{ele.description}</p>
											<button
												class="btn btn-danger like"
												onClick={() =>
													handleLike(ele.id)
												}
												id="likebtn"
												key={ele.id}
												style={{
													backgroundColor: `${color.btnColor}`
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill={color.textColor}
													class="bi bi-heart-fill"
													viewBox="0 0 16 16"
													
												>
													<path
														fill-rule="evenodd"
														d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
													/>
												</svg>
												<span style={{
													color: `${color.textColor}`,
												}} className="ml-2">{ele.likes}</span>
											</button>
										</div>
									</MDBCard>
								</MDBContainer>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Feed;
