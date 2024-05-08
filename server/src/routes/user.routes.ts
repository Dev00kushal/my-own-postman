import { createUserHandler } from "controllers/user.controller";
import express from "express";
import vaildateResources from "middleware/validateResources";
import { createUserSchema } from "schema/user.schema";

const router = express.Router();

router.post(
  "api/users",
  vaildateResources(createUserSchema),
  createUserHandler
);
export default router;
