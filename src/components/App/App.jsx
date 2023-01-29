import React, { Component }  from "react";
import css from "./App.module.css";
// import  ContactForm  from "../ContactForm";
import Container from "../Container";
import  ContactList  from "../ContactList";
import Filter from "../Filter";

import ContactForm from "components/ContactForm";

const LS_KEY = "saved_contacts";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount () {
    const savedContacts = localStorage.getItem(LS_KEY);

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
        console.log("App.state.contacts is loaded  from  localStorage")
        console.log(this.state.contacts);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts){
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }


  onSubmitHandler = newContact => { 
    const contacts = this.state.contacts;
    const isUnique = contacts.filter( contactInBook => 
      contactInBook.name.toLowerCase() === newContact.name.toLowerCase());
    
    if (isUnique.length > 0) {
      return alert (`${newContact.name} is already in contacts.`);
    }
    else {
      this.setState(  (prevState) => {
        return ({contacts: [...prevState.contacts, newContact] })
      })
      //console.log('newContact added to phonebook');
    }
  }

  onHandleFilter = event => {
    const value =  event.currentTarget.value;
    this.setState( {filter: value} );
  }

  searchName = () => {
    const searchingName = this.state.filter.toLowerCase();

    return this.state.contacts.filter( contact => (
      contact.name.toLowerCase().includes(searchingName)
    ));
  }

  deleteContact = id => { 
    this.setState(  prevState => ({
      contacts: prevState.contacts.filter( contact => contact.id !== id)
    }))
  }

  render () {
    const {contacts, filter} = this.state;
    return (  
        <Container>
          <div className={css.phoneBookContainer}>
            <h1 className={css.title}>Phonebook</h1>
            <ContactForm 
            onSubmit={this.onSubmitHandler}/>
          </div>

          <h2 className={css.title}>Contacts</h2> 

          <Filter 
          valueFilter={filter} 
          onChangeFilter={this.onHandleFilter}/>  
            
          { contacts.length > 0 && 
          (<ContactList contacts={this.searchName()} onBtnClick={this.deleteContact}/>)}  

        </Container>
      
    )
  }
};

export default App;