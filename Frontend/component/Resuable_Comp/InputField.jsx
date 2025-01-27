function InputField({type,placeholder,value,readOnly,onChange}){
    return(
        <>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                readOnly={readOnly}
                onChange={onChange}
                />
                
        </>
    )
}

export default InputField;