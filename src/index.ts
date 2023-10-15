import express from "express";
import "dotenv/config";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users";
import { CreateUserController } from "./controllers/create-user/create-users";

const main = async () => {
  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  // Route 1
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  // Route 2
  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Server Listening
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
};

main();
