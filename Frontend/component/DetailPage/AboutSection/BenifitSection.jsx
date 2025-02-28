function BenifitSection({benefits}){
    return(
        <div className="box">
            <h3>{benefits.heading}</h3>
            <ul>
              {benefits.points.map((point,idx)=>
                            <li key={idx}>{point}</li>)}
            </ul>
          </div>
    )
}

export default BenifitSection;