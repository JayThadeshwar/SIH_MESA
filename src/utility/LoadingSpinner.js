import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="spinner-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="loading-spinner">
            </div>
        </div>
    );
}