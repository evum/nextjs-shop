'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

type UserData = {
	email: string;
	password: string;
}

const RedirectButton = () => {
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const userDataStr = localStorage.getItem('user');
		if (!userDataStr) { return; }
		const userData = JSON.parse(userDataStr);
		setTimeout(() => setUserData(userData));
	}, []);
	return userData
		? <Link href={`calendar?user=${userData.email}`}>Перейти в календарь</Link>
		: <Link href={'login'}>Войти в аккаунт</Link>
};

export default RedirectButton;
