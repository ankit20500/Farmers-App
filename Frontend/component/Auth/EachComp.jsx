import InputField from '../Resuable_Comp/InputField.jsx';
import '../Auth/Signup/Signup.css'

function EachComp({name,type,onChange,placeholder,value,readOnly=false}){
    return(
        <div className='signup-input'>
            <span>{name}</span><br/>
            <InputField onChange={onChange} type={type} placeholder={placeholder} value={value} readOnly={readOnly}/>
        </div>
    )
}

export default EachComp;