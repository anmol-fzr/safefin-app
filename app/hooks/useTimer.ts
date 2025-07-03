import { useEffect, useState } from "react";

export const useCountdown = (secs = 30) => {
	const [countdown, setCountdown] = useState(secs);

	useEffect(() => {
		const intrvl = setInterval(() => {
			setCountdown((t) => {
				if (t !== 0) {
					return t - 1;
				}
				return t;
			});
		}, 1000);

		return () => {
			clearInterval(intrvl);
		};
	}, []);

	function resetTimer() {
		setCountdown(secs);
	}

	return { countdown, resetTimer };
};
