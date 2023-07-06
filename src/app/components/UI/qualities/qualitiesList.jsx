import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getUserQualities } = useQuality();
    const qualitiesList = getUserQualities(qualities);
    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    } else return "loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
