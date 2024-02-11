import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function home() {
  return (
    <>
      <Navbar />
      <div className="flex w-full min-h-screen">
        {/* Todo: Make list and pagination here */}
        Todo
      </div>
      <Footer />
    </>
  );
}
