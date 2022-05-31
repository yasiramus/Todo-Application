import "./modal.css";

function ShowModal({ open, onClose }) {

    if (!open) {
      
        return null;
        
    } else {
        
        return (
        
            <>
                
            <div className="overlay">
                
                <div className="modalContainer">
                    
                    <p> 
                        
                        Sorry your account hasn't been verified, click on the resend button to verify account
                        
                    </p>
                        
                    <button type="submit" onClick={onClose}>
                        
                        Resend Code
                        
                    </button>
                     
                </div>
                
            </div>
                
            </>
            
        );
        
    }
    
}

export default ShowModal;
