import { JwtStrategy } from "./jwt.strategy";
import { getJwtConfig } from "./../config/jwt.config";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./../prisma.service";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
