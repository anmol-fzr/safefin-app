function compoundInterest(
	principal: number,
	rate: number,
	time: number,
	n: number = 12, // Default to monthly compounding
): number {
	const r = rate / 100;
	const totalAmount = principal * Math.pow(1 + r / n, n * time);
	return totalAmount;
}

function compoundInterestEarned(
	principal: number,
	rate: number,
	time: number,
	n: number = 12, // Default to monthly compounding
): number {
	return compoundInterest(principal, rate, time, n) - principal;
}

function calcSwp(
	principal: number,
	rate: number,
	durationYears: number,
	withdrawal: number,
) {
	const n = durationYears * 12; // number of months
	const i = rate / 12 / 100; // monthly interest rate

	const futureValue =
		principal * Math.pow(1 + i, n) -
		withdrawal * ((Math.pow(1 + i, n) - 1) / i);

	return futureValue;
}

function calcMF(principal: number, rate: number, years: number): number {
	return compoundInterestEarned(principal, rate, years);
}

type PPFInput = {
	yearlyContribution: number; // Amount deposited each year
	rate: number; // Annual interest rate (%)
	years: number; // Total tenure (typically 15)
};

function calcPPF({ yearlyContribution, rate, years }: PPFInput): number {
	const r = rate / 100;
	let total = 0;

	for (let i = 0; i < years; i++) {
		total = (total + yearlyContribution) * (1 + r);
	}

	return total;
}

type EPFInput = {
	monthlySalary: number; // Basic + DA
	age: number; // Current age
	employeeContributionPercent: number; // Your share (% of salary)
	annualSalaryIncreasePercent: number; // Yearly hike in %
	interestRate: number; // Annual EPF interest (%)
};

function calculateEPF({
	monthlySalary,
	age,
	employeeContributionPercent,
	annualSalaryIncreasePercent,
	interestRate,
}: EPFInput): number {
	const retirementAge = 58;
	const months = (retirementAge - age) * 12;
	const monthlyRate = interestRate / 12 / 100;
	const employeeRate = employeeContributionPercent / 100;
	const employerRate = 0.12; // Fixed as per Indian EPF rules
	const hikeRate = annualSalaryIncreasePercent / 100;

	let totalAmount = 0;
	let currentSalary = monthlySalary;

	for (let month = 1; month <= months; month++) {
		const employeeContribution = currentSalary * employeeRate;
		const employerContribution = currentSalary * employerRate;

		const monthlyContribution = employeeContribution + employerContribution;

		totalAmount = (totalAmount + monthlyContribution) * (1 + monthlyRate);

		// Apply annual salary hike every 12 months
		if (month % 12 === 0) {
			currentSalary *= 1 + hikeRate;
		}
	}

	return totalAmount;
}

const currenctFmt = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

export { calcSwp, calcMF, currenctFmt, calcPPF };
