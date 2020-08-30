import { UsernamePasswordInput } from "../types";

export function validateRegister(options: UsernamePasswordInput) {
  const errors = [];

  if (options.username.length <= 2)
    errors.push({
      field: "username",
      message: "username is too short",
    });

  if (options.username.includes("@"))
    errors.push({
      field: "username",
      message: "cannot include an @",
    });

  if (!options.email.includes("@"))
    errors.push({
      field: "email",
      message: "email is not valid",
    });

  if (options.password.length <= 3)
    errors.push({
      field: "password",
      message: "password is too short",
    });

  return errors.length > 1 ? { errors } : null;
}
