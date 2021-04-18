export type User = {
	username: string;
	tag1: number;
	tag2: number;
	tag3: number;
	tag4: number;
	tag5: number;
};

export type UserStats = {
	datasets: {
		data: number[],
		backgroundColor: string[],
	}[];
	labels: string[];
};
