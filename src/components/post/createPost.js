import React, { useState } from "react";
import ApiEndpoints from "../../api/apiEndpoints";
import ApiConnector from "../../api/apiConnector";
import { useForm } from "react-hook-form";
import AppPaths from "../../lib/appPaths";
import "./createpost.css";
import Pic1 from "../../projectPics/Pic1.jpg";
import Pic3 from "../../projectPics/Pic3.jpg";
import Pic2 from "../../projectPics/Pic2.jpg";
import Pic4 from "../../projectPics/Pic4.jpg";
import Pic5 from "../../projectPics/Pic5.jpg";

const CreatePost = ({ modal, setModal, fetchFeeds }) => {
	const [description, setDesription] = useState("");
	const [file, setFile] = useState(null);
	const [postData, setPostData] = useState({});
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const image = watch("image");
	let display = "none";
	if (modal) display = "block";

	const handleClick = async (postData) => {
		console.log('postdata')
		const formData = new FormData();
		formData.append("image", image[0]);
		delete postData["image"];
		Object.keys(postData).forEach((key) => {
			formData.append(key, postData[key]);
		});

		const successLoginData = await ApiConnector.sendPostRequest(
			ApiEndpoints.CREATE_POST,
			formData,
			true,
			true
		);

		if (successLoginData) {
			fetchFeeds();
		}
		setModal(!modal);
	};

	window.onclick = (event) => {
		console.log(event.target.id)
		if(event.target.id === 'feedbody' || event.target.id==='feedcard') setModal(false);
	}

	// return (
	//     <div style={{background:'cyan',width:'450px',diaplay:'flex',justifyContent:'center',alignItems:'center',marginLeft:'33%',marginTop:'20%'}}>
	//         <form onSubmit={handleSubmit(handleClick)} style={{display:'flex',flexDirection:'column',justifyContent:'center',}}>
	//             <input
	//                 type="file"
	//                 name="image"
	//                 {...register("image", { required: true })}
	//             />

	//             <input type='text' name='description' {...register("description", { required: true })}/>

	//             <button type='submit'>Add Post</button>
	//         </form>
	//     </div>
	// )

	return (
		<div
			className="post"
			style={{
				display: `${display}`,
				position: 'fixed',
				top: '-8rem',
				left: '25rem',
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					opacity: "1",
				}}
			>
				<div
					style={{
						// background:
						// 	"linear-gradient(to bottom right, #d8ff07, #d8ff07)",
						// backgroundColor:"transparent",
						width: "450px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "1.1rem",
						fontWeight: "500",
						borderRadius: "10px",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.8)",
						padding: "20px",
						color: "black",
					}}
					className="bg-light"
				>
					<form
						onSubmit={handleSubmit(handleClick)}
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<input
							type="file"
							name="image"
							{...register("image", { required: true })}
							style={{
								border: "none",
								borderRadius: "5px",
								padding: "10px",
								margin: "10px 0",
								width: "100%",
								boxSizing: "border-box",
							}}
						/>

						<input
							type="text"
							name="description"
							{...register("description", { required: true })}
							style={{
								border: "none",
								borderRadius: "5px",
								padding: "10px",
								margin: "10px 0",
								width: "100%",
								boxSizing: "border-box",
							}}
							placeholder="Add Caption..."
						/>


						<button
							type="submit"
							style={{
								backgroundColor: "#388e3c",
								color: "white",
								border: "none",
								borderRadius: "5px",
								padding: "10px 20px",
								cursor: "pointer",
								transition: "background-color 0.3s", // Added transition effect
								marginTop: "10px", // Adjusted margin top for spacing
								position: 'sticky'
							}}
							onMouseEnter={(e) => {
								e.target.style.backgroundColor = "#006500";
							}} // Change color on hover
							onMouseLeave={(e) => {
								e.target.style.backgroundColor = "#388e3c";
							}} // Revert color on mouse leave
						>
							Add Post
						</button>

						<div
							onClick={() => {setModal(!modal)}}
							style={{
								backgroundColor: "red",
								color: "white",
								border: "none",
								borderRadius: "5px",
								padding: "10px 20px",
								cursor: "pointer",
								transition: "background-color 0.3s", // Added transition effect
								marginTop: "10px", // Adjusted margin top for spacing
							}}
							onMouseEnter={(e) => {
								e.target.style.backgroundColor = "#cc0000";
							}} // Change color on hover
							onMouseLeave={(e) => {
								e.target.style.backgroundColor = "red";
							}} // Revert color on mouse leave
						>
							Cancel
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
