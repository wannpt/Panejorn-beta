export type User = {
	username: string;
	tag1: number;
	tag2: number;
	tag3: number;
	tag4: number;
	tag5: number;
	image?: any;
};

export type UserStats = {
	datasets: {
		label: string,
		data: number[],
		backgroundColor: String,
		borderColor: string,
		borderWidth: number
	}[];
	labels: string[];
};
