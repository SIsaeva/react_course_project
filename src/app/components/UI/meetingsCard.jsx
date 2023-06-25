import React from "react";
import PropTypes from "prop-types";

const MeetingsCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>

                <h1 className="display-1">{data}</h1>
            </div>
        </div>
    );
};
MeetingsCard.propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default MeetingsCard;
