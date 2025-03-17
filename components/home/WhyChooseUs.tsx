import { 
  BadgeDollarSign, 
  Headphones, 
  ShieldCheck, 
  Award 
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <BadgeDollarSign className="text-2xl" />,
      title: "Best Price Guarantee",
      description: "Find a lower price? We'll match it and give you an additional 5% discount."
    },
    {
      icon: <Headphones className="text-2xl" />,
      title: "24/7 Customer Support",
      description: "Our travel experts are available round the clock to assist with any queries."
    },
    {
      icon: <ShieldCheck className="text-2xl" />,
      title: "Secure Booking",
      description: "Book with confidence knowing your payments and personal data are secure."
    },
    {
      icon: <Award className="text-2xl" />,
      title: "Curated Experiences",
      description: "Every package is carefully crafted to provide authentic and memorable experiences."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose TravelEase</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Discover why thousands of travelers trust us for their vacation planning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
