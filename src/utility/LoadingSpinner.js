import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="spinner-container mb-5 mt-5" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="loading-spinner">
            </div>
        </div>
    );
}