import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
}
