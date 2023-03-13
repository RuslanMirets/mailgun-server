import { IsEmail, IsString, Length } from "class-validator";

export class RegisterDto {
	@IsEmail(undefined, { message: "Incorrect mail" })
	email: string;

	@Length(6, 32, {
		message:
			"The password length must be at least 6 and a maximum of 32 characters",
	})
	password: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;
}
