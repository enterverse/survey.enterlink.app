import { useEffect, useState } from "react";

export interface UseFetchResponseError {
	data: null;
	loading: false;
	error: Error;
}

export interface UseFetchResponseLoading {
	data: null;
	loading: true;
	error: null;
}

export interface UseFetchResponseSuccess<T> {
	data: T;
	loading: false;
	error: null;
}

export type UseFetchResponse<T> =
	| UseFetchResponseError
	| UseFetchResponseLoading
	| UseFetchResponseSuccess<T>;

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				setData(json);
			} catch (reason) {
				setError(reason instanceof Error ? reason : new Error(String(reason)));
			} finally {
				setLoading(false);
			}
		};

		fetchData().catch(console.error);
	}, [url]);

	return { data, loading, error } as UseFetchResponse<T>;
};
