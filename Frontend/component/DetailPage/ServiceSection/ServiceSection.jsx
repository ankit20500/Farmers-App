import "./ServiceSection.css";

const services = [
  {
    image: "https://agrevolution.in/assets/images/farmer-solution/access-quality-input.webp",
    title: "Easy Buying & Selling",
    description:"Farmers can easily purchase high-quality fertilizers, pesticides, and farming equipment directly from verified sellers. No need to visit multiple markets; everything is available at competitive prices. Additionally, farmers can sell their crops directly through the platform, ensuring fair rates and eliminating middlemen. Secure payment options and transparent transactions make the process smooth and hassle-free. Experience a convenient way to trade agricultural goods with just a few clicks.",
  },
  {
    image: "https://www.artisantg.com/assets/icons/Secure_PMT_319x250.png",
    title: "Secure Payment System",
    description: "We provide a highly secure and reliable payment system for seamless transactions. Farmers can choose from multiple payment methods, including UPI, net banking, debit/credit cards, and even cash on delivery. All transactions are encrypted and protected against fraud. Our easy refund policy ensures complete customer satisfaction. Payments are processed swiftly, ensuring timely payments for sellers and peace of mind for buyers.",
  },
  {
    image: "https://agrevolution.in/assets/images/farmer-solution/bima-shield.webp",
    title: "Direct Farmer-to-Buyer Connection",
    description: "Our platform eliminates the need for middlemen by directly connecting farmers with buyers. Farmers can list their produce, negotiate prices, and finalize deals in a transparent manner. Buyers get fresh and high-quality produce at the best market rates. Real-time chat support enables smooth communication between both parties. This direct interaction helps farmers maximize their profits while buyers receive the best quality products.",
  },
  {
    image: "https://agrevolution.in/assets/images/farmer-solution/profitable-markets.webp",
    title: "Reliable Logistics & Delivery",
    description: "We offer fast and efficient delivery services to ensure that farming products reach their destination safely. Our logistics network covers even remote areas, providing doorstep delivery for convenience. Farmers and buyers can track their orders in real time and receive updates about their shipments. Temperature-controlled transportation ensures that perishable goods remain fresh. Hassle-free return options are also available in case of any issues.",
  },
  {
    image: "https://agrevolution.in/assets/images/farmer-solution/actionable-advisory.webp",
    title: "Farmer Knowledge Hub",
    description: "A dedicated knowledge hub that provides expert guidance on modern farming techniques, crop management, and sustainable agriculture. Farmers can access articles, videos, and expert consultations to improve their yield and profitability. Weather updates, pest control tips, and government schemes are regularly updated to keep farmers informed. Our interactive community forum allows farmers to share experiences and learn from each other. This knowledge hub empowers farmers to make better agricultural decisions for long-term success.",
  },
  {
    image: "https://agrevolution.in/assets/images/farmer-solution/formal-credit.webp",
    title: "Instant Loan Facility",
    description: "We understand the financial challenges farmers face, which is why we provide easy and quick loan facilities. Farmers can apply for low-interest loans to purchase seeds, fertilizers, and modern farming equipment. The loan approval process is simple, with minimal paperwork and fast disbursal. Our partnership with leading financial institutions ensures fair and transparent loan terms. Repayment options are flexible, allowing farmers to repay as per their crop cycle earnings. Get financial support when you need it the most and invest in a better future for your farm.",
  }
];

const ServiceSection = () => {
  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <p>Helping farmers grow and buyers find quality products with ease.</p>
      <div className="service-list">
        {services.map((service, index) => (
          <div key={index} className={`service-item ${index % 2 === 0 ? "left" : "right"}`}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
