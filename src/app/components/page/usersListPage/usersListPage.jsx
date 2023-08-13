import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../UI/searchStatus";
import UserTable from "../../UI/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";
const UsersListPage = () => {
    const pageSize = 5;
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchString, setSearchString] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const handleDelete = (userId) => {
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchString]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchString("");
    };

    const handleSearchString = ({ target }) => {
        setSearchString(target.value);
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    function filterUsers(data) {
        const filteredUsers = selectedProf
            ? data.filter((user) => user.profession === selectedProf._id)
            : searchString
            ? data.filter((user) =>
                  user.name
                      .toLocaleLowerCase()
                      .includes(searchString.toLocaleLowerCase())
              )
            : data;
        return filteredUsers.filter((user) => user._id !== currentUserId);
    }

    if (users) {
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
            setSearchString("");
        };

        if (userCrop.length === 0 && currentPage !== 1) {
            setCurrentPage((prev) => prev - 1);
        }

        return (
            <div className="d-flex">
                {professions && !professionLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchString"
                        placeholder="Search..."
                        onChange={handleSearchString}
                        value={searchString}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
