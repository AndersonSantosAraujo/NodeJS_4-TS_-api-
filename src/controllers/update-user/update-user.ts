import { User } from "../../models/user";
import { badRequest, serverError, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing user id.");
      }

      const allowedFieldToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !allowedFieldToUpdate.includes(key as keyof UpdateUserParams),
      );

      if (someFieldNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed.");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
