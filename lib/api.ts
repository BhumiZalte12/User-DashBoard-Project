import axios from "axios";
import { User } from "../src/types";

const API_URL = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(API_URL);
  return res.data.map(u => ({
    ...u,
    avatar: u.avatar ?? undefined,  
  }));
};
