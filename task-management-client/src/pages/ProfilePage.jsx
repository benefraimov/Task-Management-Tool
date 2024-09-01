import React, { useEffect, useState } from "react";
import classes from "../styles/ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser, updateUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [stateUser, setStateUser] = useState(user);
  const [selectedImage, setSelectedImage] = useState(null); // File object for upload
  const [imagePreview, setImagePreview] = useState(null); // URL for image preview

  useEffect(() => {
    if (user.image) {
      console.log(user.image);
      setImagePreview(user.image); // Update preview if user data changes
    }
  }, [user.image]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // Clean up previous image URL when component unmounts or before updating
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", stateUser.username);
    formData.append("email", stateUser.email);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    if (stateUser.password) {
      formData.append("password", stateUser.password);
    }

    // Dispatch the formData to update the user profile
    dispatch(updateUser(formData));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file); // Save the File object for upload
      setImagePreview(URL.createObjectURL(file)); // Generate URL for image preview
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const logOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes["inner-container"]}>
        <h2>Account Profile</h2>
        <div className={classes.profileSection}>
          <div
            className={classes.profilePictureContainer}
            onClick={handleImageClick}>
            <img
              src={imagePreview || user.profilePicture} // Show preview if available
              alt="Profile"
              className={classes.profilePicture}
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="username"
                value={stateUser?.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={stateUser?.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={stateUser?.password || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={classes.saveBtn}>
              Save Changes
            </button>
            <button
              type="button"
              className={classes.logoutBtn}
              onClick={logOut}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
