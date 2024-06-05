import { cn } from "@udecode/cn";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-neutral-900", className)}
			{...props}
		/>
	);
}

export { Skeleton };
