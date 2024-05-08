import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "First name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short should he min 6 characters"),

    passwordConfirmation: string({
      required_error: "Password Conformation is required",
    }),
    email: string({
      required_error: "Email is required",
    })
      .email("Not a vaild email")
      .refine((data: any) => data.password == data.passwordConfirmation, {
        message: "Password doesnot match",
        path: ["passwordConfirmation"],
      }),
  }),
});


export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];