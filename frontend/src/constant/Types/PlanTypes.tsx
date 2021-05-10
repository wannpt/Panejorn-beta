export type PlaceType = {
	placeId: string;
	placeType: string;
	placeName: string;
	timeRange: string;
};

export type PlanType = {
	planId: number;
	planName: string;
	dateRange: string;
	province: string;
	budget: number;
	planDetail: PlanDetailType[];
};

export type PlanDetailType = {
    day: number,
    date: string,
    detail: {
        placeType: string,
        placeId: string,
        placeName: string,
        timeRange: string
    }[];
}

export type PlanChoices = {
	plan: {
		display: {
			dateRange: string;
			planName: string;
			province: string;
		};
		information: {
			planId: number;
			planName: string;
			startDate: number;
			endDate: number;
			minBudget: number;
			maxBudget: number;
			numberOfChildren: number;
			numberOfAdults: number;
			planScore: number;
			mainLocation: string;
			distance: number;
			diversity: number;
			status: number;
			userID: number;
			tag1: number;
			tag2: number;
			tag3: number;
			tag4: number;
			tag5: number;
			pinned: boolean;
			creationTime: number;
			deletionTime: number;
			updatedTime: number;
			planDetails: null;
		};
	};
	planDetail: {
		display: {
			planDetail: {
				date: string;
				day: number;
				detail: {
					placeId: string;
					placeName: string;
					placeType: string;
					timeRange: string;
				}[];
			}[];
			totalCost: number;
		}[];
		information: {
			totalCost: number;
			planDetail: {
				day: number;
				detail: {
					Id: number;
					planId: number;
					placeId: string;
					placeName: string;
					day: number;
					startTime: number;
					endTime: number;
					status: number;
					tag1: number;
					tag2: number;
					tag3: number;
					tag4: number;
					tag5: number;
					creationTime: number;
					deletionTime: number;
					updatedTime: number;
				}[];
			}[];
		}[];
	};
	success: boolean;
};
