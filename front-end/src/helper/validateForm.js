import { useState, useEffect, useRef } from 'react';

const ValidateForm = (callback, validate, initialValues, onFly = true) => {

  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmit, sethasSubmit] = useState(false);
  const [firstRender, setfirstRender] = useState(true);

  const formRendered = useRef(true)

  useEffect(() => {
    if (!formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setfirstRender(true);
      setIsSubmitting(false);
      sethasSubmit(false);
    }
    formRendered.current = false;
  }, [initialValues]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback({ values, errors });
    }
  }, [errors]); 

  useEffect(() => {
    if(onFly){
      setIsSubmitting(false);
      if(!firstRender && hasSubmit){      
        setErrors(validate(values));
        //console.log("change value");
      }
      else{
        setfirstRender(false);
      }    
    }
  }, [values])
  
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    sethasSubmit(true);
  };

  const handleChange = (event) => {
    event.persist();
    //console.log(event.target.value);
    if(event.target.multiple){
      let value = Array.from(event.target.selectedOptions, option => option.value);
      setValues(values => ({ ...values, [event.target.name]: value }));
    }else if(event.target.type === 'checkbox'){
      setValues(values => ({ ...values, [event.target.name]: event.target.checked }));
    }
    else {
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default ValidateForm;