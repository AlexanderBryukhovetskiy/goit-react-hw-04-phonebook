import { useState, useEffect }  from "react";
import css from "./App.module.css";
import Container from "../Container";
import ContactForm from "components/ContactForm";
import  ContactList  from "../ContactList";
import Filter from "../Filter";

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);

  const [filter, setFilter] = useState('');
  
  useEffect( () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandler = newContact => { 
    const isUnique = contacts.filter( contactInStorage => 
      contactInStorage.name.toLowerCase() === newContact.name.toLowerCase());
    
    if (isUnique.length > 0) {
      return alert (`${newContact.name} is already in contacts.`);
    }
    else {
      setContacts( [...contacts, newContact] );
    }
  }

  const onHandleFilter = event => {
    const value =  event.currentTarget.value;
    setFilter(value);
  };

  const searchName = () => {
    const searchingName = filter.toLowerCase();

    const filteredContacts = contacts.filter( contact => (
      contact.name.toLowerCase().includes(searchingName))
    );

    return filteredContacts;
  };

  const deleteContact = id => { 
      setContacts( contacts.filter( contact => contact.id !== id) );
  };

  return (  
      <Container>
        <div className={css.phoneBookContainer}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm 
          onSubmit={onSubmitHandler}/>
        </div>

        <h2 className={css.title}>Contacts</h2> 

        <Filter 
        valueFilter={filter} 
        onChangeFilter={onHandleFilter}/>  
          
        { contacts.length > 0 && 
        (<ContactList contacts={searchName()} onBtnClick={deleteContact}/>)}  
      </Container>
  )
};

export default App;