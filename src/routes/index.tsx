import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center bg-gray-900 min-h-screen flex items-center justify-center">
			<h1 className="text-3xl font-bold text-white">Hello, World!</h1>
		</div>
	);
}
