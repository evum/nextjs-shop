'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function register(name: string, email: string, password: string) {
	if (!email || !password || password.length < 6) {
		return { error: 'Некорректные данные' };
	}

	const existingUser = await prisma.user.findUnique({
		where: { email }
	});

	if (existingUser) {
		return { error: 'Пользователь с таким email уже зарегистрирован' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name: name || undefined
		}
	});

	return { success: true };
}
