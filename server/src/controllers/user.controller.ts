import { Request, Response } from "express";
import { CreateUserInput } from "schema/user.schema";
import { createUser } from "services/user.service";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const use = await createUser(body);
    return res.send("User Created Sucessfully");
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send("Account Already Exists");
    }
    return res.status(500).send(error);
  }
}
