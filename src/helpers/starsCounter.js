import {FaStar, FaStarHalf} from "react-icons/fa";
import React from "react";

export const starsCounter = (rating) => {
    const intPart = Math.floor(rating);
    const decPart = rating - intPart;
    const fullStars = Array.from({length: intPart}, (_, i) => <FaStar key={i} size="25px"/>);
    const halfStar = decPart >= 0.5 ? <FaStarHalf key={intPart} size="25px"/> : null;
    return [...fullStars, halfStar];
}
