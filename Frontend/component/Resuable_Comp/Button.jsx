function Button({value,onclick}){
    return(
        <button onClick={onclick}>{value}</button>
    )
}

export default Button;