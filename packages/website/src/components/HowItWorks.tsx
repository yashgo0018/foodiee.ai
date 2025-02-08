export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Set Your Preferences",
      description: "Choose your dietary requirements and preferred languages",
    },
    {
      number: "02",
      title: "Browse Translated Menus",
      description: "View any menu in your language with filtered options",
    },
    {
      number: "03",
      title: "Order with Confidence",
      description: "Place your order knowing exactly what you're getting",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-orange-500 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
