function Footer() {
  return (
    <footer className="bg-cyan-600 px-4 sm:px-6 lg:px-8 pb-8 pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Footer Content */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="flex max-w-sm gap-4 sm:col-span-2 lg:col-span-1">
            <div className="relative size-14 sm:size-16 shrink-0">
              <svg
                viewBox="0 0 64 64"
                className="size-full"
                aria-label="Rangkuman Logo"
              >
                <title>Rangkuman Logo</title>
                <circle cx="32" cy="32" r="32" fill="#FAFAFA" />
                <path
                  d="M15.1 13.4h19.2v38.4H15.1z"
                  fill="#0891B2"
                  opacity="0.9"
                />
                <path
                  d="M35.7 8.3l13.4 11.1-4.8 32.1-13.4-11.1 4.8-32.1z"
                  fill="#F59E0B"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Rangkuman
              </h3>
              <p className="text-sm sm:text-base leading-6 text-white/90">
                Platform pembelajaran inovatif yang membantu Anda memahami
                materi dengan lebih mudah menggunakan teknologi AI terkini.
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Produk</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm sm:text-base text-white/90">
                Ringkasan Otomatis
              </li>
              <li className="text-sm sm:text-base text-white/90">
                Quiz Generator
              </li>
              <li className="text-sm sm:text-base text-white/90">Chat AI</li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Perusahaan
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm sm:text-base text-white/90">
                Tentang Kami
              </li>
              <li className="text-sm sm:text-base text-white/90">Blog</li>
              <li className="text-sm sm:text-base text-white/90">Kontak</li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm sm:text-base text-white/90">
                Kebijakan Privasi
              </li>
              <li className="text-sm sm:text-base text-white/90">
                Syarat & Ketentuan
              </li>
              <li className="text-sm sm:text-base text-white/90">Cookies</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-white/20" />

        {/* Copyright */}
        <p className="text-sm sm:text-base text-white/90 text-center sm:text-left">
          © 2025 Rangkuman. Semua hak dilindungi
        </p>
      </div>
    </footer>
  );
}

export default Footer;
