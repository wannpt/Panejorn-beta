export const ProvinceOptionsConst = ['กรุงเทพมหานคร', 'นครราชสีมา', 'ชลบุรี', 'ภูเก็ต'];

export const BudgetOptionsConst = [
	{ key: '1000-2000 บาท', value: { min: 1000, max: 2000 } },
	{ key: '2000-3000 บาท', value: { min: 2000, max: 3000 } },
	{ key: '3000-4000 บาท', value: { min: 3000, max: 4000 } },
	{ key: '4000-5000 บาท', value: { max: 4000, min: 5000 } },
];

export const AdultOptionsConst = [
	{ key: '1 คน', value: 1 },
	{ key: '2 คน', value: 2 },
	{ key: '3 คน', value: 3 },
	{ key: '4 คน', value: 4 },
];

export const ChildrenOptionsConst = [
	{ key: 'ไม่มี', value: 0 },
	{ key: '1 คน', value: 1 },
	{ key: '2 คน', value: 2 },
	{ key: '3 คน', value: 3 },
	{ key: '4 คน', value: 4 },
];

export const InputConst = {
	planName: 'แผนเที่ยวใหม่',
	province: 'กรุงเทพมหานคร',
	minBudget: 1000,
	maxBudget: 2000,
	numberOfAdult: 1,
	numberOfChildren: 1,
};
