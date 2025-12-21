import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileQuestion,
  Hash,
  MessageSquareText,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

// ============================================================================
// Logo Component
// ============================================================================
function Logo({
  className,
  variant = "dark",
}: Readonly<{ className?: string; variant?: "dark" | "light" }>) {
  const textColor =
    variant === "dark" ? "text-foreground" : "text-primary-foreground";
  const accentColor =
    variant === "dark" ? "text-primary" : "text-primary-foreground/80";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/assets/logo.svg"
        alt="Rangkuman Cerdas Logo"
        className="size-16"
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-heading text-xl font-semibold leading-tight tracking-tight",
            textColor,
          )}
        >
          Rangkuman
        </span>
        <span
          className={cn(
            "font-heading text-xl font-semibold leading-tight tracking-tight",
            accentColor,
          )}
        >
          Cerdas
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Sidebar Component
// ============================================================================
function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 flex flex-col h-screen gap-2 border-r w-80 border-border bg-background">
      <div className="flex flex-col gap-10 px-8 pt-8 pb-4">
        <Logo />

        <div className="flex flex-col gap-4">
          <Link
            to="/auth/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
            )}
          >
            Mulai Belajar Sekarang
            <ArrowRight className="size-5" />
          </Link>

          <div className="flex gap-3">
            <Link
              to="/auth/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 py-3 font-semibold rounded-2xl border-border text-foreground",
              )}
            >
              Masuk
            </Link>
            <Link
              to="/auth/register"
              className={cn(
                buttonVariants(),
                "flex-1 py-3 font-semibold rounded-2xl bg-primary/10 text-primary hover:bg-primary/20",
              )}
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>

      <div className="px-10 py-0">
        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-bold tracking-wider uppercase font-heading text-muted-foreground">
            Keunggulan Utama
          </h3>

          <ul className="flex flex-col gap-4">
            <FeatureListItem>
              Ringkasan AI akurat dalam hitungan detik
            </FeatureListItem>
            <FeatureListItem>
              Kuis otomatis langsung dari materi kuliah
            </FeatureListItem>
            <FeatureListItem>
              Tanya jawab kontekstual 24/7 tanpa batas
            </FeatureListItem>
          </ul>
        </div>
      </div>
    </aside>
  );
}

function FeatureListItem({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 p-0.5">
        <Check className="text-green-600 size-3" />
      </div>
      <span className="text-sm font-medium leading-6 text-muted-foreground">
        {children}
      </span>
    </li>
  );
}

// ============================================================================
// Hero Section
// ============================================================================
function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-8 px-12 pb-12 pt-28">
      <div className="flex flex-col items-center max-w-4xl gap-8 text-center">
        {/* Badge */}
        <Badge className="gap-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/15">
          <Sparkles className="size-4" />
          AI-Powered Learning Assistant
        </Badge>

        {/* Title */}
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight font-heading text-foreground lg:text-7xl">
          Buka Potensi Belajarmu
          <br />
          dengan
          <br />
          <span className="text-transparent bg-linear-to-r from-primary via-primary/80 to-blue-600 bg-clip-text">
            Kecerdasan Buatan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg font-heading text-muted-foreground lg:text-xl">
          Platform all-in-one untuk meringkas dokumen, membuat kuis otomatis,
          dan memahami materi kuliah kompleks dalam hitungan detik.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            to="/auth/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 px-8 py-4 text-base font-bold shadow-xl rounded-2xl bg-primary shadow-primary/25 hover:bg-primary/90",
            )}
          >
            <Rocket className="size-5" />
            Mulai Belajar Sekarang
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-16 pt-10 mt-6 border-t border-border">
          <StatItem value="10k+" label="Mahasiswa Aktif" />
          <Separator orientation="vertical" className="h-12 bg-border" />
          <StatItem value="500k+" label="Dokumen Diringkas" />
          <Separator orientation="vertical" className="h-12 bg-border" />
          <StatItem value="4.9/5" label="Rating Rata-rata" />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  label,
}: Readonly<{ value: string; label: string }>) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold font-heading text-foreground">
        {value}
      </span>
      <span className="text-sm font-heading text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ============================================================================
// Features Section
// ============================================================================
function FeaturesSection() {
  return (
    <section className="px-12 py-12">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex items-end justify-between px-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold font-heading text-foreground">
              Fitur Unggulan
            </h2>
            <p className="text-base font-heading text-muted-foreground">
              Semua yang kamu butuhkan untuk study smarter, not harder.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Ringkasan Instan - Large Card */}
          <Card className="col-span-7 p-0 overflow-hidden border shadow-none rounded-3xl border-primary/20 bg-linear-to-br from-primary/5 to-blue-50">
            <CardContent className="relative p-8">
              <div className="absolute rounded-full -right-16 -top-16 size-64 bg-primary/10 blur-3xl" />
              <div className="relative flex flex-col gap-5">
                <div className="flex items-center justify-center shadow-sm size-14 rounded-3xl bg-card">
                  <Zap className="size-6 text-primary" />
                </div>
                <h3 className="font-sans text-2xl font-bold text-foreground">
                  Ringkasan Instan
                </h3>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  Ubah ratusan halaman dokumen menjadi poin-poin penting yang
                  mudah dipahami hanya dalam hitungan detik. Hemat waktu bacamu
                  hingga 80%.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Kuis AI Otomatis */}
          <Card className="col-span-5 p-0 border shadow-none rounded-3xl border-border bg-card">
            <CardContent className="flex flex-col justify-center h-full p-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center bg-orange-100 size-12 rounded-3xl">
                  <FileQuestion className="text-orange-600 size-5" />
                </div>
                <h3 className="font-sans text-xl font-bold text-foreground">
                  Kuis AI Otomatis
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Uji pemahamanmu dengan kuis yang digenerate langsung dari
                  materimu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ekstraksi Kata Kunci */}
          <Card className="col-span-7 p-0 border shadow-none rounded-3xl border-border bg-card">
            <CardContent className="flex items-center gap-8 p-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center bg-purple-100 size-12 rounded-3xl">
                  <Hash className="text-purple-600 size-6" />
                </div>
                <h3 className="font-sans text-xl font-bold text-foreground">
                  Ekstraksi Kata Kunci
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Temukan topik utama dan istilah penting secara otomatis untuk
                  memudahkan pemetaan materi belajar. Cocok untuk review cepat
                  sebelum ujian.
                </p>
              </div>

              {/* Keyword Tags */}
              <div className="flex flex-wrap gap-2">
                <KeywordTag>Machine Learning</KeywordTag>
                <KeywordTag variant="primary">Neural Networks</KeywordTag>
                <KeywordTag>Deep Learning</KeywordTag>
                <KeywordTag>Algorithm</KeywordTag>
                <KeywordTag variant="purple">
                  Artificial Intelligence
                </KeywordTag>
              </div>
            </CardContent>
          </Card>

          {/* Chat Kontekstual */}
          <Card className="col-span-5 p-0 border shadow-none rounded-3xl border-border bg-card">
            <CardContent className="flex flex-col justify-between h-full p-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center bg-blue-100 size-12 rounded-3xl">
                  <MessageSquareText className="text-blue-600 size-5" />
                </div>
                <h3 className="font-sans text-xl font-extrabold text-foreground">
                  Chat Kontekstual
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tanya apa saja tentang dokumenmu. AI akan menjawab dengan
                  referensi halaman yang akurat.
                </p>
              </div>

              {/* Avatar Group */}
              <div className="flex items-center pt-4">
                <div className="border-2 rounded-full size-8 border-card bg-muted" />
                <div className="flex items-center justify-center -ml-2 border-2 rounded-full size-8 border-card bg-primary/10">
                  <span className="text-xs font-bold font-heading text-primary">
                    AI
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function KeywordTag({
  children,
  variant = "default",
}: Readonly<{
  children: React.ReactNode;
  variant?: "default" | "primary" | "purple";
}>) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    primary: "border border-primary/20 bg-primary/10 text-primary",
    purple: "border border-purple-200 bg-purple-50 text-purple-600",
  };

  return (
    <span
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}

// ============================================================================
// Footer Component
// ============================================================================
function Footer() {
  return (
    <footer className="ml-80 bg-primary text-primary-foreground">
      <div className="px-12 py-12">
        <div className="flex items-start justify-around">
          {/* Logo and Description */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col max-w-xs gap-4">
              <Logo variant="light" />
              <p className="text-base leading-relaxed text-primary-foreground/90">
                Platform pembelajaran inovatif yang membantu Anda memahami
                materi dengan lebih mudah menggunakan teknologi AI terkini.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-20">
            <FooterLinkGroup
              title="Produk"
              links={["Ringkasan Otomatis", "Quiz Generator", "Chat AI"]}
            />
            <FooterLinkGroup
              title="Perusahaan"
              links={["Tentang Kami", "Blog", "Kontak"]}
            />
            <FooterLinkGroup
              title="Legal"
              links={["Kebijakan Privasi", "Syarat & Ketentuan", "Cookies"]}
            />
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      <div className="px-12 py-6">
        <p className="text-base text-primary-foreground/90">
          © 2025 Rangkuman Cerdas. Semua hak dilindungi
        </p>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: Readonly<{ title: string; links: string[] }>) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              to="/"
              className="text-base transition-colors text-primary-foreground/90 hover:text-primary-foreground"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// Main Landing Page Component
// ============================================================================
function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 ml-80">
          <HeroSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
