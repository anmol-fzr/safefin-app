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

const currenctFmt = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

export { calcSwp, calcMF, currenctFmt, calcPPF };
