import React, { Component } from "react";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

const initialState = {
    name: '',
    number: '',
}

class ContactForm extends Component {
    state = initialState;

    handleChange = event => {
      const { name, value } = event.currentTarget;
      this.setState({ [name]: value});
    }  
    
    handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit({...this.state, id: nanoid()});  // {name: "q", number: "651", id: "gfg23"}
      this.reset();
    }

    reset = () => {
      this.setState(initialState);
    }

    render () {

      const {name, number} = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
            />
          </label>

          <label>Number
            <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +, number of symbols: from 5 to 13"
            required
            max-length={13}
            min-length={5}
            value={number}
            onChange={this.handleChange}
            />
          </label>

          <button className={css.submitBtn} type="submit">Add contact</button>
        </form>
      )
    }
} 

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;