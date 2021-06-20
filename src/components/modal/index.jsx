import React, { useState } from 'react'
import './style.scss'

function EditProfile({ closeModal, modalState, value }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState('male');

  if (!modalState) { return null; }

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && gender) {
      value({ username: name, usergender: gender });
      setName("");
      setGender("male");
      closeModal();
    } else {
      alert("complete the input form!")
    }
  }

  const handleGender = (e) => {
    setGender(e.target.value);
  }

  return (
    <div id="modal" className={`modal is-active`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <input type="text" className="input" placeholder="input username ..."
            value={name} onChange={e => setName(e.target.value)} />
          <div className="select">
            <select onChange={handleGender} value={gender}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button className="button is-primary" type="submit" value="Submit">Submit</button>
        </form>
      </div>

      <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
    </div>
  )
}

export default EditProfile
