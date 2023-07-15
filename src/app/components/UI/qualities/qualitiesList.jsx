import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getUserQualities } = useQualities();
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
