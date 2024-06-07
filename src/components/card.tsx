import { XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./drawer";

import type { PropsWithChildren } from "react";

function urlParametersToObject(search: URLSearchParams) {
	const object: Record<string, string> = {};

	for (const [key, value] of search) {
		object[key] = value;
	}

	return object;
}

export function Card({
	children,
	title,
	description,
	traits
}: PropsWithChildren<{
	title: string;
	description: string;
	traits: string;
}>) {
	const href = `/${title.toLowerCase()}.512x512.min.webp`;
	const [parameters, setParameters] = useSearchParams();
	const type = parameters.get("type");

	return (
		<Drawer
			open={type === title.toLowerCase()}
			onOpenChange={(state) => {
				if (state) {
					setParameters((previous) => ({
						...urlParametersToObject(previous),
						type: title.toLowerCase()
					}));
				} else {
					setParameters((previous) => {
						const object = urlParametersToObject(previous);
						delete object.type;

						return object;
					});
				}
			}}
		>
			<DrawerTrigger asChild>
				<button
					className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6 transition-all hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
					type="button"
				>
					<img alt={title} className="size-20 shrink-0" src={href} />
					<div>
						<p className="text-left font-semibold">{title}</p>
						<p className="text-left text-sm text-neutral-400">{description}</p>
					</div>
				</button>
			</DrawerTrigger>
			<DrawerContent className="h-[90%] sm:h-full">
				<DrawerClose asChild>
					<button
						className="fixed right-12 top-12 hidden flex-col rounded text-neutral-400 transition-colors hover:text-red-400 focus-visible:text-red-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50 sm:flex"
						type="button"
					>
						<XCircle className="size-10 text-current" strokeWidth={1} />
						<p className="text-current">ESC</p>
					</button>
				</DrawerClose>
				<div className="flex size-full flex-col items-center overflow-y-auto p-6">
					<div className="flex w-full max-w-4xl flex-col gap-8">
						<img alt={title} className="mx-auto size-48 shrink-0" src={href} />
						<div>
							<h1 className="text-center text-3xl font-semibold">{title}</h1>
							<h2 className="text-center text-lg text-neutral-400">{traits}</h2>
						</div>
						<div className="my-4 h-px w-full bg-neutral-800" />
						<article className="prose prose-neutral prose-invert max-w-4xl prose-headings:font-medium">
							{children}
						</article>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
