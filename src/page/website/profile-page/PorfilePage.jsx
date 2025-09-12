import { useUserProfileQuery } from "@/router/auth-api/authApi";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
    const { data, error, isLoading } = useUserProfileQuery();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        avatar: "",
        cus_add: "",
        cus_city: "",
        cus_country: "",
        cus_fax: "",
        cus_name: "",
        cus_phone: "",
        cus_postcode: "",
        cus_state: "",
        ship_add: "",
        ship_city: "",
        ship_country: "",
        ship_name: "",
        ship_phone: "",
        ship_postcode: "",
        ship_state: "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Populate form when API data is ready
    useEffect(() => {
        if (data?.data) setFormData(data.data);
    }, [data]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setAvatarFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = new FormData();
        Object.keys(formData).forEach((key) => submissionData.append(key, formData[key]));
        if (avatarFile) submissionData.append("avatar", avatarFile);

        try {
            const res = await fetch("/api/customer/update", {
                method: "PUT",
                body: submissionData,
            });
            const result = await res.json();
            setSuccessMessage("Profile updated successfully!");
            console.log("Profile updated:", result);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex space-x-2">
                    <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                    <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-450"></span>
                </div>
            </div>
        );

    if (error)
        return (
            <p className="text-red-500 text-center mt-10">
                Something went wrong: {error?.data?.message || error.status}
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl lg:my-10 ">
            <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar Upload */}
                <div className="flex flex-col md:col-span-2 items-center">
                    {formData.avatar && !avatarFile && (
                        <img
                            src={formData.avatar}
                            alt="Current Avatar"
                            className="w-24 h-24 rounded-full object-cover mb-3 border"
                        />
                    )}
                    {avatarFile && (
                        <img
                            src={URL.createObjectURL(avatarFile)}
                            alt="New Avatar Preview"
                            className="w-24 h-24 rounded-full object-cover mb-3 border"
                        />
                    )}
                    <label className="font-medium mb-1">Avatar</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded-lg p-2" />
                </div>

                {/* Profile Info */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Profile Info</h3>
                </div>
                {["full_name", "email"].map((field) => inputField(field, formData, handleChange))}

                {/* Customer Info */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Customer Info</h3>
                </div>
                {["cus_add", "cus_city", "cus_country", "cus_fax", "cus_name", "cus_phone", "cus_postcode", "cus_state"].map(
                    (field) => inputField(field, formData, handleChange)
                )}

                {/* Shipping Info */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Shipping Info</h3>
                </div>
                {["ship_add", "ship_city", "ship_country", "ship_name", "ship_phone", "ship_postcode", "ship_state"].map(
                    (field) => inputField(field, formData, handleChange)
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

// Helper function to render input field
function inputField(name, formData, handleChange) {
    return (
        <div key={name} className="flex flex-col">
            <label className="mb-1 font-medium capitalize">{name.replace(/_/g, " ")}</label>
            <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
