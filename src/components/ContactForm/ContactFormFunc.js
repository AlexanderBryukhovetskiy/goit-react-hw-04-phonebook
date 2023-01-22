import { useState } from "react";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";


export default function ContactForm () {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const handleChange = event => {
      const { name, value } = event.target;

      switch (name) {
        case 'name':
          setName(value);
          break;

        case 'number':
          setNumber(value);
          break;

        default: 
          return;
      }
    };

    handleSubmit = event => {
      event.preventDefault();

      // this.props.onSubmit({...this.state, id: nanoid()});  // {name: "q", number: "651", id: "gfg23"}
      
      // event.currentTarget.reset();
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Name
          <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          />
        </label>

        <label>Number
          <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          />
        </label>

        <button className={css.submitBtn} type="submit">Add contact</button>
      </form>
    )
}