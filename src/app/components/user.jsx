import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (user) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <Qualitie key={user._id} {...quality} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button onClick={() => user.onToogleBookMark(user._id)}>
            {<Bookmark key={user._id} status={user.bookmark} />}
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => user.onDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
