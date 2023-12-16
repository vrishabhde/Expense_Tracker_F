export const contactValidation = (contact) => {
    
    const contactPattern = /^\d{10}$/;
  
    if (!contactPattern.test(contact)) {
      throw new Error("Invalid contact number, please enter a 10-digit number.");
    }
  };
  