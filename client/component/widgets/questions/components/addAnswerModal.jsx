import React, { useEffect, useState } from 'react';

import AnswerPhotoModal from './AnswerPhotoModal.jsx';
import PhotoModalImage from './PhotoModalImage.jsx';

const axios = require('axios');
const url = 'http://localhost:3000/qa/questions';

const AddAnswerModal = ({ show, question, name, getAnswers }) => {

  const [answerField, setAnswerField] = useState('');
  const [nicknameField, setNicknameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [modalPhotos, setModalPhotos] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const answerFieldChange = (event) => {
    setAnswerField(event.target.value);
  }

  const nicknameFieldChange = (event) => {
    setNicknameField(event.target.value);
  }

  const emailFieldChange = (event) => {
    setEmailField(event.target.value);
  }

  const submitAnswer = () => {
    let message = 'You must enter the following: '
    if (answerField.length === 0) {
      message += 'answer * ';
    }
    if (nicknameField.length === 0) {
      message += 'nickname * ';
    }
    if (emailField.length === 0) {
      message += 'email * ';
    } else if (emailField.indexOf('@') === -1) {
      message += 'correct email format '
    }

    if (message !== 'You must enter the following: ') {
      setSubmitMessage(message);
    } else {
      axios({
        method: 'POST',
        url: `${url}/${question.question_id}/answers`,
        data: {
          body: answerField,
          name: nicknameField,
          email: emailField,
          photos: modalPhotos
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          getAnswers();
          show(false);
        })
    }
  }

  const clickCloseModal = () => {
    show(false);
  }

  const showUploadModal = () => {
    setShowPhotoModal(true);
  }

  return (
    <div id="answerModal">
      {showPhotoModal ? <AnswerPhotoModal show={setShowPhotoModal} modalPhotos={modalPhotos} setModalPhotos={setModalPhotos} /> : null}
      <span id="closeAModal" onClick={clickCloseModal}>&times;</span>
      <h3 id="AmodalTitle">Submit Your Answer</h3>
      <h5 id="AmodalSubTitle">{`${name}: ${question.question_body}`}</h5>
      <div id="answerFields">
        <label className="aFieldNames">Your Answer *</label>
        <textarea id="answerModalBody" type="text" maxLength="1000" onChange={answerFieldChange}></textarea>
        <div id="allAnswerPhotos">
          {modalPhotos.length > 0 ? modalPhotos.map((photo, index) => {
            return (
              <PhotoModalImage photo={photo} key={index} />
            )
          }) : null}
        </div>
        <label className="aFieldNames">What is your nickname *</label>
        <input type="text" maxLength="60" placeholder="Example: jack543!" onChange={nicknameFieldChange}></input>
        <span className="aModalInfo">For privacy reasons, do not use your full name or email address</span>
        <label className="aFieldNames">Your email *</label>
        <input type="text" maxLength="60" placeholder="Example: jack@email.com" onChange={emailFieldChange}></input>
        <span className="aModalInfo">For authentication reasons, you will not be emailed</span>
        {/* <button id="uploadAnswerPhoto" onClick={showUploadModal}>Upload Photo</button> */}
        {modalPhotos.length < 5 ? <button id="uploadAnswerPhoto" onClick={showUploadModal}>Upload Photo</button> : null}
        <button id="submitAnswer" onClick={submitAnswer}>Submit Answer</button>
        <span id="submitAMessage">{submitMessage}</span>
      </div>
    </div>
  )
}

export default AddAnswerModal;