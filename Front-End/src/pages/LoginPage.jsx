import { useContext, useState } from "react";
import wheel from '../images/vault-wheel.png';
import logo from '../images/logo.png';
import { DataContext } from "../context/DataContext";

const LoginPage = (props) => {
    const {setToken} = useContext(DataContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email:'', password:'', name:'', confirmPassword:''}); 
    const [currentStatus, setCurrentStatus] = useState('login');
    const [confirmPassword, setConfirmPassword] = useState ('');
    const [isUnlocking, setIsUnlocking] = useState (false);
    const [showPassword, setShowPassword] = useState(false);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({email:'', password:'', confirmPassword:'', firstName:'', lastName:'' });

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
        
    } else if (currentStatus === 'signup' && !firstName && !lastName) {
        setErrors({...errors, firstName:"Name field can not be left empty"}); 
    } else if (currentStatus === 'signup' &&  password !== confirmPassword) {
        setErrors({...errors, confirmPassword:"Passwords do not match, please re-enter."});
    } else {
        if (currentStatus === 'signup') {
            const response = await fetch(`http://localhost:8080/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': `application/json` },
            body: JSON.stringify({ firstName, lastName, email, password })
        }); 
        if (!response.ok) {
            setErrors({...errors, email: 'Registration failed. Account with email may already exist'});
            return;
        }
        setCurrentStatus('login');
        } else {
            const response = await fetch(`http://localhost:8080/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': `application/json` },
                body: JSON.stringify({ email, password })
            }); 
            if (!response.ok) {
                setErrors({...errors, email: 'Invalid email or password'});
            return;
            }       
            const data = await response.json();
            setToken(data.token);
            setIsUnlocking(true);
            setTimeout(() => {
                props.onLogin({ name: email, email });
            }, 3500); 
        };
    }  
}
    
    return (
    <div className="login">
        <div className={`door-left ${isUnlocking ? 'opening' : ''}`}></div>
        <div className={`door-right ${isUnlocking ? 'opening' : ''}`}></div>
        <img className={`wheel ${isUnlocking ? 'spinning' : ''}`} src={wheel} alt="vault wheel" />
        <div className={`login-about ${isUnlocking ? 'fading' : ''}`}/>       

        <div className={`login-content ${isUnlocking ? 'fading' : ''}`}>
                <h1> <span className="title"> All My Vault </span>
                    <img src={logo} alt="All My Vault" className="cover-logo" />
                </h1>
        </div>
        
        <div className={`login-form-container ${isUnlocking ? 'fading' : ''}`}>
        <form onSubmit={handleSubmit}>
                {currentStatus === 'signup' && (
            
            <div className="name">
                        <label>
                            First Name:
                        <input type="text" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}  />
                        {errors.name && <span>{errors.name}</span>}
                        </label>
                        <label>
                            Last Name:
                        <input type="text" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}  />
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
                    <input type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}    
                    </span>    

                    {errors.password && <span>{errors.password}</span>}
                    </label>
                </div>

                <div className="pass-confirm">
                    {currentStatus === 'signup' && (
                    <label>
                    Confirm Password:
                    <input type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}  />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}    
                    </span>    
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
        

                <div className="login-about">
                    <button className="about" type="button"
                    onClick={props.onOpenAbout} >
                     About 💡
                </button>
                </div>
         </form>     
            </div>
        
        
    
    </div>
);
};

export default LoginPage;
