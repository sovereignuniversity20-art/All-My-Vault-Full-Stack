import { useState } from "react";
import wheel from '../images/vault-wheel.png';
import logo from '../images/logo.png';

const LoginPage = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email:'', password:'', name:'', confirmPassword:''}); 
    const [currentStatus, setCurrentStatus] = useState('login');
    const [confirmPassword, setConfirmPassword] = useState ('');
    const [isUnlocking, setIsUnlocking] = useState (false);

   

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({email:'', password:'', confirmPassword:'', name:''});

// Email and Password Validation //
    if (!/^[a-zA-Z0-9.! # \$ % & ' * + - / = ? ^ _  { | } ~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        setErrors({...errors, email:'Please enter a valid email address'})
        
    } else if ( password.length < 8) {
        setErrors({...errors, password:'Password must be at least 8 characters long'})
        
    } else if (!/[A-Z]/.test(password)) {
        setErrors({...errors, password:'Password must contain at least one uppercase letter.'})
        
    } else if (!/[a-z]/.test(password)) {
        setErrors({...errors, password:'Password must contain at least one lowercase letter.'})
           
    } else if (!/[0-9]/.test(password)) {
        setErrors({...errors, password:'Password must contain at least one number.'})
        
    } else if (!/[!@#$%]/.test(password)) {
        setErrors({...errors, password:'Password must contain at least one special character, ! @ # $ % .'})
        
    } else if (currentStatus === 'signup' && !name) {
        setErrors({...errors, name:"Name field can not be left empty"}); 
    } else if (currentStatus === 'signup' &&  password !== confirmPassword) {
        setErrors({...errors, confirmPassword:"Passwords do not match, please re-enter."});
    } else {
        setIsUnlocking(true);
        setTimeout(() => {
              props.onLogin({
            name: currentStatus === 'signup' ? name: email, email: email});
        }, 3500); 
      
    }};
   
    
    return (
    <div className="login">
        <div className={`door-left ${isUnlocking ? 'opening' : ''}`}></div>
        <div className={`door-right ${isUnlocking ? 'opening' : ''}`}></div>
        <img className={`wheel ${isUnlocking ? 'spinning' : ''}`} src={wheel} alt="vault wheel" />
        <div className={`login-about ${isUnlocking ? 'fading' : ''}`}>
            
            
            <button className="button" type="button"
            onClick={props.onOpenAbout} >
                About 💡
            </button>
        </div>
        <div className={`login-content ${isUnlocking ? 'fading' : ''}`}>
            <h1> <span className="title">
                    All My Vault
                </span>
                <img src={logo} alt="All My Vault" className="cover-logo" />
            </h1>
        <h4>Enter Your Email and Password to Access Vault</h4>
        <form onSubmit={handleSubmit}>
        {currentStatus === 'signup' && (
        <div className="name">
             <label>
                First and Last Name:
            <input type="text" value={name}
            onChange={(e) => setName(e.target.value)}  />
            {errors.name && <span>{errors.name}</span>}
            </label>
        </div> 
     )} 
        <div>
            <label className="email">
                Email:
                <input type="email" value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span>{errors.email}</span>}
            </label>
        </div>
      
        <div className="pass">
            <label>
            Password:
            <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
            </label>
        </div>

        <div className="pass-confirm">
            {currentStatus === 'signup' && (
        <label>
        Confirm Password:
        <input type="password" value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}  />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </label>
        )} 
        </div>
    
        <div className="unlock-create">
            <button className="button" type="submit">{currentStatus === 
            'signup' ? "Create Vault" : "Unlock Vault"}</button>
        </div>
    
        <div className="login-signup">
            <button className="button" type="button" onClick={() => currentStatus === 'login' ? setCurrentStatus('signup') : 
            setCurrentStatus ('login')}>{currentStatus === 'signup' ? "Already have an account? Log in here" : 
            "Sign up for an account"}</button>
        </div>
    </form>
        </div>
        
    </div>
);
};

export default LoginPage;