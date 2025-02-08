import {
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: GlobeAltIcon,
    title: "Menu Translation",
    description: "Instantly translate any menu into your preferred language",
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: "Dietary Filtering",
    description:
      "Find dishes that match your dietary restrictions and preferences",
  },
  {
    icon: ChartBarIcon,
    title: "Nutritional Insights",
    description: "Get detailed nutritional information for every dish",
  },
  {
    icon: GiftIcon,
    title: "Rewards Program",
    description: "Earn points and get discounts on your food orders",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 text-center">
              <feature.icon className="h-12 w-12 mx-auto text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
