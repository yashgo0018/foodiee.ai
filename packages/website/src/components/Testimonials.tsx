import Image from "next/image";

const testimonials = [
  {
    quote:
      "This extension has been a game-changer for my travels. No more guessing what I'm ordering!",
    name: "Sarah Chen",
    role: "Digital Nomad",
    avatar: "/avatar1.png",
  },
  {
    quote:
      "As someone with dietary restrictions, Foodiee.ai gives me peace of mind when eating abroad.",
    name: "Mike Johnson",
    role: "Food Blogger",
    avatar: "/avatar2.png",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-orange-50 rounded-lg">
              <p className="text-lg mb-4 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
