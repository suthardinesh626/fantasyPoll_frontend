import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../store/UserSlice';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    avatar: null,
  });

  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
      setCroppedImage(null); // Reset cropped image when a new image is selected
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImageLoaded = (image) => {
    console.log('Image loaded:', image);
  };

  const handleCropComplete = (crop) => {
    if (crop.width && crop.height) {
      getCroppedImage(crop);
    }
  };

  const getCroppedImage = (crop) => {
    const image = document.createElement('img');
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          setCroppedImage(blob);
        }, 'image/jpeg');
      };
    };
    reader.readAsDataURL(formData.avatar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('avatar', croppedImage);
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('username', formData.username);

    try {
      await dispatch(registerUser(formDataObj)).unwrap();
      // Handle success, e.g., navigate to another page
      // navigate('/login');
    } catch (err) {
      // Handle error, e.g., display error message
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {formData.avatar && (
            <div className="mt-4">
              <ReactCrop
                src={URL.createObjectURL(formData.avatar)}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={handleCropComplete}
                onImageLoaded={handleImageLoaded}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !croppedImage}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
