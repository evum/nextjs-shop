'use client'

import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

type UserData = {
	email: string;
	password: string;
}

const saveUserData = async (email: string, pass: string): Promise<UserData> => {
	const response = await fetch(`api/user?email=${email}&pass=${pass}`);
	const res = await response.json();
	localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const getUserInfoFromStorage = (): UserData | null => {
	const data = localStorage.getItem('user');
	if (!data) { return null; }
	const parsedData = JSON.parse(data);
	if (parsedData.email && parsedData.password) { return parsedData; }
	return null;
};

const RedirectButton = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => { setTimeout(() => setUserData(getUserInfoFromStorage()), 0); }, []);
	
	const onSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		saveUserData(email, password).then((res) => setUserData(res));
	};

	return userData
		? <Link href={`calendar?email=${userData.email}`}>Вы успешно авторизованы и можете перейти в календарь</Link>
		: <form onSubmit={onSubmit}>
		<input
			type="text"
			value={email}
			placeholder="Введите e-mail"
			onChange={(e) => setEmail(e.currentTarget.value)}
		/>
		<input
			type="password"
			value={password}
			placeholder="Введите пароль"
			onChange={(e) => setPassword(e.currentTarget.value)}
		/>
		<button type="submit">Войти</button>
	</form>;
};

export default RedirectButton;
