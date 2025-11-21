import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900">
			<h1 className="text-3xl font-bold text-white">Hello, World!</h1>
			<Link
				to="/auth/login"
				className="text-3xl font-bold text-white underline"
			>
				Login
			</Link>
		</div>
	);
}
