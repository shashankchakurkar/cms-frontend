import client from "./client";

export const getAllStaff = () => client.get("/staff");

export const createStaff = (data) => client.post("/staff", data);
