function InputField({type,placeholder,value,readOnly,onChange,required,title,name}){
    return(
        <>
            <label>{title}</label>
            <input 
                type={type} 
                name={name}
                placeholder={placeholder} 
                value={value} 
                readOnly={readOnly}
                onChange={onChange}
                required={required}
                />
                
        </>
    )
}

export default InputField;