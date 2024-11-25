import React from 'react';
import '../css/ShimmerLoader.css';

const ShimmerLoader = () => {
    return (
        <div className="shimmer-loader">
            <div className="shimmer-box"></div>
            <div className="shimmer-box"></div>
            <div className="shimmer-box"></div>
        </div>
    );
};

export default ShimmerLoader;