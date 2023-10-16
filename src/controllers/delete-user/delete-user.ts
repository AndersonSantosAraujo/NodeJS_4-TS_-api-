import { User } from "../../models/user";
import { badRequest, serverError, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
