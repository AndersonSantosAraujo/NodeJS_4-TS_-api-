import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
