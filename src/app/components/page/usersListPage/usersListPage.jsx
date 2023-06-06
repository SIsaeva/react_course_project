import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import API from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../UI/searchStatus";
import UserTable from "../../UI/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchString, setSearchString] = useState("");
    const [sortBy, setSortBy] = useState({
        path: "name",
        order: "asc"
    });

    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
    };

    const handleToogleBookMark = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

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

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : searchString
            ? users.filter((user) =>
                  JSON.stringify(user.name)
                      .toLocaleLowerCase()
                      .includes(searchString.toLocaleLowerCase())
              )
            : users;

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
                {professions && users && (
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
                    <TextField
                        id="search"
                        name="search"
                        value={searchString}
                        placeHolder="Search..."
                        onChange={handleSearchString}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToogleBookMark={handleToogleBookMark}
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

export default UsersListPage;
