import React from "react";
import UserItem from "./UserItem";

const ClassList = () => {
    return (
    <div className=" bg-white flex flex-col gap-5 p-3 rounded-md">
        <UserItem
            role={"Mentor"}
            name={"Thầy Lâm"}
            specialized={"DOTNET, React, Spring Boot"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />
        <UserItem
            role={"Student"}
            name={"Trịnh Quốc Thắng"}
            specialized={"NodeJS"}
            gender={"Male"}
        />

    </div>
    );
};

export default ClassList;
