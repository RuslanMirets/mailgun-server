import { PrismaService } from "./prisma.service";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, MailModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
