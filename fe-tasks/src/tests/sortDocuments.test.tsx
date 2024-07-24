import React from "react";
import data from "../data/data.json";
import { sortDocuments } from "../components/Documents";

test("returns data sorted by name", () => {
    expect(sortDocuments(data, "name")).toStrictEqual([
        { added: "2016-08-12", name: "Cost centres", size: 1, type: "csv" },
        {
            added: "2017-01-06",
            name: "Employee Handbook",
            size: 2.1,
            type: "pdf",
        },
        {
            added: "2017-05-02",
            files: [
                {
                    added: "2017-05-02",
                    name: "Expenses claim form",
                    size: 2.5,
                    type: "doc",
                },
                {
                    added: "2017-05-03",
                    name: "Fuel allowances",
                    size: 1.4,
                    type: "doc",
                },
            ],
            name: "Expenses",
            size: 3.9,
            type: "folder",
        },
        {
            added: "2015-04-24",
            files: [
                {
                    added: "2017-12-01",
                    name: "Christmas party",
                    size: 0.6,
                    type: "doc",
                },
                {
                    added: "2015-04-24",
                    name: "Welcome to the company!",
                    size: 14.5,
                    type: "mov",
                },
            ],
            name: "Misc",
            size: 15.1,
            type: "folder",
        },
        {
            added: "2016-12-06",
            name: "Public Holiday policy",
            size: 2.2,
            type: "pdf",
        },
    ]);
});

test("returns data sorted by added date", () => {
    expect(sortDocuments(data, "added")).toStrictEqual([
        {
            added: "2015-04-24",
            files: [
                {
                    added: "2017-12-01",
                    name: "Christmas party",
                    size: 0.6,
                    type: "doc",
                },
                {
                    added: "2015-04-24",
                    name: "Welcome to the company!",
                    size: 14.5,
                    type: "mov",
                },
            ],
            name: "Misc",
            size: 15.1,
            type: "folder",
        },
        { added: "2016-08-12", name: "Cost centres", size: 1, type: "csv" },
        {
            added: "2016-12-06",
            name: "Public Holiday policy",
            size: 2.2,
            type: "pdf",
        },
        {
            added: "2017-01-06",
            name: "Employee Handbook",
            size: 2.1,
            type: "pdf",
        },
        {
            added: "2017-05-02",
            files: [
                {
                    added: "2017-05-02",
                    name: "Expenses claim form",
                    size: 2.5,
                    type: "doc",
                },
                {
                    added: "2017-05-03",
                    name: "Fuel allowances",
                    size: 1.4,
                    type: "doc",
                },
            ],
            name: "Expenses",
            size: 3.9,
            type: "folder",
        },
    ]);
});

test("returns data sorted by size", () => {
    expect(sortDocuments(data, "size")).toStrictEqual([
        { added: "2016-08-12", name: "Cost centres", size: 1, type: "csv" },
        {
            added: "2017-01-06",
            name: "Employee Handbook",
            size: 2.1,
            type: "pdf",
        },
        {
            added: "2016-12-06",
            name: "Public Holiday policy",
            size: 2.2,
            type: "pdf",
        },
        {
            added: "2017-05-02",
            files: [
                {
                    added: "2017-05-02",
                    name: "Expenses claim form",
                    size: 2.5,
                    type: "doc",
                },
                {
                    added: "2017-05-03",
                    name: "Fuel allowances",
                    size: 1.4,
                    type: "doc",
                },
            ],
            name: "Expenses",
            size: 3.9,
            type: "folder",
        },
        {
            added: "2015-04-24",
            files: [
                {
                    added: "2017-12-01",
                    name: "Christmas party",
                    size: 0.6,
                    type: "doc",
                },
                {
                    added: "2015-04-24",
                    name: "Welcome to the company!",
                    size: 14.5,
                    type: "mov",
                },
            ],
            name: "Misc",
            size: 15.1,
            type: "folder",
        },
    ]);
});

test("returns data filtered", () => {
    expect(sortDocuments(data, "name", "t")).toStrictEqual([
        { added: "2016-08-12", name: "Cost centres", size: 1, type: "csv" },
    ]);
});
