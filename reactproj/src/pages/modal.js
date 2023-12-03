import React, { useState } from "react";

import "./modal.css";

export const Modal = ({closeModal, onSubmit, defaultValue}) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            name: "",
            email: "",
            role: "member",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.page && formState.description && formState.status) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(formState)
        onSubmit(formState); // Update the data in the parent component
        
        closeModal(); // Close the modal after updating the data
    };
    

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            
            <div className="modal2">
                <form >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                     <input name="name" type="text"
                      onChange={handleChange} value={formState.name}
                       />
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                         <input name="email" type="email"
                      onChange={handleChange} value={formState.email}
                       />
                   
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            value={formState.role}
                        >
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                        </select>
                    </div>
                    {errors && <div className="error">{`Please include: ${errors}`}</div>}
                    <button type="submit" 
                     onClick={handleSubmit} style={{width:"50%", marginLeft:"90px"}}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};