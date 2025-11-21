import { createFileRoute, Link } from "@tanstack/react-router";
import { useId } from "react";
import Lock from "@/icons/Lock";
import Mail from "@/icons/Mail";
import SignIn from "@/icons/SignIn";

export const Route = createFileRoute("/auth/login")({
	component: Login,
});

function Login() {
	const emailId = useId();
	const passwordId = useId();

	return (
		<div className="flex min-h-screen">
			<div className="w-1/2 bg-gray-300"></div>
			<div className="flex items-center justify-center w-1/2 px-12 bg-gray-100">
				<form className="flex flex-col w-sm">
					<h1 className="text-2xl font-bold text-center">
						Sign in to your account
					</h1>
					<label htmlFor={emailId} className="flex flex-col gap-1 pt-8">
						<span className="font-medium">Email</span>
						<div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text">
							<Mail />
							<input
								className="flex-1 outline-none"
								type="email"
								placeholder="Example: email@domain.com"
								name="email"
								id={emailId}
								required
							/>
						</div>
					</label>
					<label htmlFor={passwordId} className="flex flex-col gap-1 pt-4">
						<span className="font-medium">Password</span>
						<div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text">
							<Lock />
							<input
								className="flex-1 outline-none"
								type="password"
								placeholder="Enter your password"
								name="password"
								id={passwordId}
								required
							/>
						</div>
					</label>
					<button
						type="submit"
						className="flex items-center justify-center gap-2 py-3 mt-8 font-medium text-white rounded-lg cursor-pointer bg-cyan-600 hover:bg-cyan-700"
					>
						<SignIn />
						Sign In
					</button>
					<p className="pt-4 text-center">
						Don't have an account?{" "}
						<Link to="/auth/register" className="text-cyan-600 hover:underline">
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
