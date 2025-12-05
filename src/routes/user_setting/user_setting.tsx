import { createFileRoute } from "@tanstack/react-router";
import Lock from "@/icons/Lock";
import Mail from "@/icons/Mail";
import Person from "@/icons/Person";

export const Route = createFileRoute("/user_setting/user_setting")({
	component: UserSetting,
});

function UserSetting() {
	return (
		<div className="bg-neutral-100 min-h-screen">
			{/* Main Content */}
			<div className="container mx-auto px-8 py-12">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-black mb-5">Profil</h1>
					<p className="text-2xl text-black">Atur profil kamu di sini</p>
				</div>

				<div className="bg-neutral-50 rounded-3xl shadow-lg flex overflow-hidden max-w-5xl mx-auto">
					{/* Left Panel - Avatar */}
					<div className="w-2/5 flex items-center justify-center p-12 border-r border-gray-200">
						<div className="flex flex-col items-center gap-5">
							<div className="w-36 h-36 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
								<Person className="w-20 h-20 text-white" />
							</div>
							<p className="text-sm font-medium text-black">User123456</p>
						</div>
					</div>

					<div className="w-3/5 p-12 flex flex-col justify-center gap-8">
						{/* Full Name */}
						<div className="flex flex-col gap-1">
							<label className="font-medium text-black">Nama lengkap</label>
							<div className="relative">
								<Person className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									placeholder="Contoh: Zahwa Bella"
									className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
								/>
							</div>
						</div>

						{/* Email */}
						<div className="flex flex-col gap-1">
							<label className="font-medium text-black">Email</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="email"
									defaultValue="Riki123@gmail.com"
									className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
								/>
							</div>
						</div>

						{/* Current Password */}
						<div className="flex flex-col gap-1">
							<label className="font-medium text-black">Password</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="password"
									placeholder="Masukkan password kamu sekarang"
									className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
								/>
							</div>
						</div>

						{/* New Password */}
						<div className="flex flex-col gap-1">
							<label className="font-medium text-black">Konfirmasi password</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="password"
									placeholder="Masukkan password kamu yang baru"
									className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="button"
							className="w-full h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-colors"
						>
							Simpan Informasi
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}