function SupportCart({supportType,disc,contact}){
    return(
        <div className="contact-box">
          <h3>{supportType}</h3>
          <p>{disc}</p>
          <p className="contact-info">{contact}</p>
        </div>
    )
}

export default SupportCart;