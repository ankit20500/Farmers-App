function StateSection({statusTitle,property}){
    return(
        <div className="stats">
            <h2>{statusTitle}</h2>
            <div className="stats-grid">
                {property.map((content,idx)=>
                    <div className="stat-box" key={idx}>
                        <h3>{content.value}</h3>
                        <p>{content.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StateSection;