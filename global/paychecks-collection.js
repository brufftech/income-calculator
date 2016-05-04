Paychecks = new Meteor.Collection ("paychecks");


HourlySchema = new SimpleSchema({
	"hourlyRate": {
		type: Number,
		label: "Wage per Hour:",
		optional: true,
		defaultValue: 8.00,
		min: 0,
		max: 100000,
		decimal: true
	},
	"hourlyHours": {
		type: Number,
		label: "Number of Hours:",
		optional: true,
		defaultValue: 40,
		min: 0,
		max: 100000
	},
	"hourlyFrequency": {
		type: String,
		label: "Frequency:",
		optional: true,
		allowedValues: ["52","12","1"],
		autoform: {
			options: [
				{label: "Week", value: '52'},
				{label: "Month", value: '12'},
				{label: "Year", value: '1'},
			]
		}		
	}
});


SalarySchema = new SimpleSchema({
	"salaryRate": {
		type: Number,
		label: "Paycheck Total:",
		optional: true,
		defaultValue: 1000.00,
		min: 0,
		max: 1000000,
		decimal: true	
	},
	"salaryFrequency": {
		type: Number,
		label: "Frequency:",
		optional: true,
		allowedValues: [52,26,24,12,1],
		defaultValue: 26,
		autoform: {
			options: [
				{label: "Weekly (1 time each week)", value: 52},
				{label: "Bi-weekly (1 time every 2 weeks)", value: 26},
				{label: "Bi-monthly (2 times every month)", value: 24},
				{label: "Monthly (1 time each month)", value: 12},
				{label: "Annually (1 time each year)", value: 1}				
			]
		}
	},
		
});


BonusSchema = new SimpleSchema({
	"bonusAmount": {
		type: Number,
		label: "Bonus Amount:",
		optional: true,
		defaultValue: 0.00
	},
	"bonusFrequency": {
		type: Number,
		label: "Frequency:",
		optional: true,
		allowedValues: [12,4,1],
		defaultValue: 1,
		autoform: {
			options: [
				{label: "Monthly (1 time each month)", value: 12},
				{label: "Quarterly (1 time every 3 months)", value: 4},
				{label: "Annually (1 time each year)", value: 1}				
			]
		}
	}
});


PaycheckSchema = new SimpleSchema({
	"incomeType": {
		type: String,
		label: "Type of Income:",
		allowedValues: ['wage', 'salary', 'bonus'],
		autoform: {
			options: [
				{label: "Hourly Wage", value: "wage"},
				{label: "Salary", value: "salary"},
				{label: "Bonus", value: "bonus"}
			]
		}
	},
	"hourlyIncome": {
		type: HourlySchema,
		label: "Hourly Income Details",
		optional: true
	},
	"salaryIncome": {
		type: SalarySchema,
		label: "Salary Income Details",
		optional: true
	},
	"bonusIncome": {
		type: BonusSchema,
		label: "Bonus Income Details",
		optional: true
	}
});


Paychecks.attachSchema(PaycheckSchema);