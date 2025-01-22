function InputField({type,placeholder,value,readOnly}){
    return(
        <>
            <input type={type} placeholder={placeholder} value={value} readOnly={readOnly}/>
        </>
    )
}

export default InputField;