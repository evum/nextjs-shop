type CalendarProps = {
	searchParams: Promise<{email: string}>;
};

const Calendar = async ({searchParams}: CalendarProps) => {

	const params = await searchParams;

	return <div>{JSON.stringify(params)}</div>
};

export default Calendar;
