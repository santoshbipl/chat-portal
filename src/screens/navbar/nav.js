import AppPaths from "../../lib/appPaths";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";
import CookieUtil from "../../util/cookieUtil";
import Constants from "../../lib/constants";
import { useEffect, useState } from "react";
import ApiUtils from "../../api/apiUtils";
import logo from "./logo.png";


const Navbar = () => {
	const logoutClickHandler = () => {
		CookieUtil.deleteCookie(Constants.ACCESS_PROPERTY);
		CookieUtil.deleteCookie(Constants.REFRESH_PROPERTY);
		window.location.href = AppPaths.LOGIN;
	};

	const loginClickHandler = (e) => {
		e.preventDefault();
		window.location.href = AppPaths.LOGIN;
	};

	const [btn, setBtn] = useState(false);
	const [details, setDetails] = useState({
		first_name: "",
		last_name: "",
		image: "",
	});

	const getProfileDetail = async () => {
		const url = ApiEndpoints.PROFILE_ICON;
		const profileDetails = await ApiConnector.sendGetRequest(url);
		setDetails(profileDetails);
	};

	useEffect(() => {
		const token = ApiUtils.getAuthHeader();
		if (token.Authorization === "JWT null") {
			setBtn(() => false);
		} else {
			setBtn(() => true);
			getProfileDetail();
		}
	},[]);

	return (
		
		<nav class="navbar navbar-expand-lg navbar-light bg-light position-sticky" >
			<img src={logo} style={{
                width: "10rem"
            }}/>

			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href={AppPaths.FEED}>
							Home
						</a>
					</li>
					<li class="nav-item active">
						<a class="nav-link" href={AppPaths.HOME}>
							Chat
						</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					{btn ? (
						<div>
							<div className="d-flex flex-row align-items-center">
								<img
									src={`http://127.0.0.1:7890${details.image}`}
									alt={details.first_name}
									style={{
										width: "7rem",
										height: "4rem",
										borderRadius: "100%",
									}}
									className="mr-2"
								/>
								<button
									onClick={logoutClickHandler}
									className="btn btn-outline-danger btn-block mt-2"
								>
									Log Out
								</button>
							</div>

							<span
								className="font-weight-bold "
								style={{
									fontSize: "1rem",
									textTransform: "capitalize",
									paddingTop: "0px",
            
								}}
							>
								{`${details.first_name} ${details.last_name}`}
							</span>
						</div>
					) : (
						<button
							onClick={loginClickHandler}
							className="btn btn-outline-warning btn-block mt-1"
						>
							Log in
						</button>
					)}
				</form>
			</div>
		</nav>
		
	);
};

export default Navbar;
