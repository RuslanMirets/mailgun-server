import { IsEmail, IsString } from "class-validator";

export class CreateMailDto {
	@IsEmail(undefined, { message: "Incorrect mail" })
	email: string;

	@IsString()
	subject: string;

	@IsString()
	message: string;
}
