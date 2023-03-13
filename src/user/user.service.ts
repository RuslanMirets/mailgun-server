import { PrismaService } from "./../prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async findOneById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: id },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				password: false,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		return user;
	}
}
