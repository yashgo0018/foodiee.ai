import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Order Food Abroad with Confidence
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Automatically translate menus and filter dishes to match your
            dietary preferences
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors">
            Install Now
          </button>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/hero-image.png"
            alt="Digital nomad using Foodiee.ai"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
