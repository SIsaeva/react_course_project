import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Qualitie key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
