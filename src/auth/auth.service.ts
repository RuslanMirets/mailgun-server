import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "src/prisma.service";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto);

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken);

		if (!result) throw new UnauthorizedException("Invalid refresh token");

		const user = await this.prisma.user.findUnique({
			where: { id: result.id },
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async register(dto: RegisterDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (oldUser) throw new BadRequestException("User already exists");

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
				firstName: dto.firstName,
				lastName: dto.lastName,
			},
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	private async issueTokens(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwtService.sign(data, {
			expiresIn: "1h",
		});

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: "7d",
		});

		return { accessToken, refreshToken };
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
		};
	}

	private async validateUser(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (!user) throw new NotFoundException("User not found");

		const isValid = await verify(user.password, dto.password);

		if (!isValid) throw new UnauthorizedException("Invalid password");

		return user;
	}
}
