import { IsEmail, Length } from "class-validator";

export class LoginDto {
	@IsEmail(undefined, { message: "Incorrect mail" })
	email: string;

	@Length(6, 32, {
		message:
			"The password length must be at least 6 and a maximum of 32 characters",
	})
	password: string;
}
