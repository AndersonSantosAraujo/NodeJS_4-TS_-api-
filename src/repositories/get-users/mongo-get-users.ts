import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Anderson",
        lastName: "Araujo",
        email: "anderson@araujo.com",
        password: "123",
      },
    ];
  }
}
