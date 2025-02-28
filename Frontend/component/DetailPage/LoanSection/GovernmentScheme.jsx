function GovScheme(){
    const schemes = [
      {
        title: "PM Kisan Samman Nidhi Yojana",
        description: "Financial assistance of ₹6,000 per year directly to farmers' bank accounts.",
        link: "https://pmkisan.gov.in/",
      },
      {
        title: "Kisan Credit Card (KCC)",
        description: "Provides affordable credit to farmers for their agricultural needs.",
        link: "https://www.nabard.org/kcc.aspx",
      },
      {
        title: "Fasal Bima Yojana",
        description: "Crop insurance for farmers to protect against natural disasters.",
        link: "https://pmfby.gov.in/",
      },
    ];
    
    return(
        <section className="section">
        <h3>🏛 Government Schemes & Subsidies</h3>
        <div className="grid">
          {schemes.map((scheme, index) => (
            <div key={index} className="card">
              <h4>{scheme.title}</h4>
              <p>{scheme.description}</p>
              <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                👉 Learn More
              </a>
            </div>
          ))}
        </div>
      </section>
    )
}

export default GovScheme;