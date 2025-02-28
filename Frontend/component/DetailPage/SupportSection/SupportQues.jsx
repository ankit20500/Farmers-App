function SupportQuestion(){
    const faqs = [
        {
          question: "KrishiMart ka istemal kaise karein?",
          answer:
            "KrishiMart par apna account banane ke baad, aap beej, khad, aur anya upkaran kharid ya bech sakte hain.",
        },
        {
          question: "Mujhe apne beej bechne hain, kaise karu?",
          answer:
            "Aap 'Sell' section mein jaake apni fasal ki listing daal sakte hain. Kharidne waale aapko seedha contact karenge.",
        },
        {
          question: "Mujhe payment nahi mila, kya karu?",
          answer:
            "Agar aapko payment nahi mila hai, to hamari support team se sampark karein: support@krishimart.com",
        },
      ];
    return(
        <section className="faq-section">
        <h3>❓ Aam Sawal (FAQs)</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-box">
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    )
}

export default SupportQuestion;