import React, {useState, useEffect} from 'react';
import {token} from '/config.js';
import Axios from 'axios';

function NewReviewForm ({factors, productName, closeModalOnSubmit}) {
  const factorGrades = {
    'Size': ['A size too small', '1/2 size too small', 'Perfect', '1/2 size too big', 'A size too wide'],
    'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide'],
    'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    'Quality': ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    'Length': ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  };


  const [starFill, setStarFill] = useState(false);
  const [starFill2, setStarFill2] = useState(false);
  const [starFill3, setStarFill3] = useState(false);
  const [starFill4, setStarFill4] = useState(false);
  const [starFill5, setStarFill5] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [starsCount, setStarsCount] = useState(1);
  const [recommend, setRecommend] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('You are trying to submit a form::::', e.target);
    console.log('form data nickname::::', e.target.reviewNickName.value);
    console.log('form data email::::', e.target.reviewEmail.value);
    console.log('form data stars::::', starsCount);
    console.log('form data review summary::::', e.target.reviewSummary.value);
    console.log('form data review body::::', e.target.reviewBody.value);
    console.log('form data recomendded::::', recommend);
    console.log('form data factors::::', factors);
    factors.forEach((factor) => console.log(e.target[factor].value, `rating for factor ${factor}`));
    let characteristics = {};
    let photoUrls = [];
  };

  return (
    <div className='review-form-container'>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          closeModalOnSubmit(false);
        }}
        className='form'
        id='form'>
        <h2 className="form__title">Write Your Review</h2>
        <h4 className="form__subtitle">{`About the ${productName}`}</h4>
        <div className="form-row-container-nickName">
          <label
            id="nickNameLabel"
            htmlFor="review-nickName"
            className="container__label">
            What is your nickname *
          </label>
          <input
            className="container__input"
            type='text'
            id="review-nickName"
            name='reviewNickName'
            placeholder='Example: jackson11!'
            maxLength='60'
            required/>
          <div className='privacy-statement'>For privacy reasons, do not use your full name or email address</div>
        </div>
        <div className="form-row-container-nickName">
          <label
            id="emailLabel"
            htmlFor="review-email"
            className="container__label">
            Your email *
          </label>
          <input
            className="container__input"
            type='email'
            id="review-email"
            name='reviewEmail'
            placeholder='Example: jackson11@email.com'
            maxLength='60'
            required/>
          <div className='privacy-statement'>For authentication reasons, you will not be emailed</div>
        </div>
        <div className='form-row-container'>
          <p className='container__label'>Overall rating *</p>
          <div id='buttons-container-stars-vote' className='buttons-container-stars-vote'>
            <div onClick={() => {
              if (starFill === true && starFill2 === true) {
                setStarFill2(false);
                setStarFill3(false);
                setStarFill4(false);
                setStarFill5(false);
              } else {
                setStarFill(true);
              }
            }} className='star-div' id='1'>{starFill === true ? '★' : '☆'}</div>
            <div onClick={() => {
              if (starFill2 === true) {
                setStarFill3(false);
                setStarFill4(false);
                setStarFill5(false);
                setStarsCount(2);
              } else {
                setStarFill(true);
                setStarFill2(true);
                setStarsCount(2);
              }
            }} className='star-div'
            id='2'>{starFill2 === true ? '★' : '☆'}
            </div>
            <div onClick={() => {
              if (starFill3 === true) {
                setStarFill4(false);
                setStarFill5(false);
                setStarsCount(3);
              } else {
                setStarFill(true);
                setStarFill2(true);
                setStarFill3(true);
                setStarFill4(false);
                setStarFill5(false);
                setStarsCount(3);
              }
            }} className='star-div' id='3'>{starFill3 === true ? '★' : '☆'}</div>
            <div onClick={() => {
              if (starFill4 === true && starFill5 === true) {
                setStarFill5(false);
                setStarsCount(4);
              } else {
                setStarFill(true);
                setStarFill2(true);
                setStarFill3(true);
                setStarFill4(true);
                setStarsCount(4);
              }
            }} className='star-div' id='4'>{starFill4 === true ? '★' : '☆'}</div>
            <div onClick={() => {
              if (starFill5 === false) {
                setStarFill(true);
                setStarFill2(true);
                setStarFill3(true);
                setStarFill4(true);
                setStarFill5(true);
                setStarsCount(5);
              }
            }} className='star-div' id='5'>{starFill5 === true ? '★' : '☆'}</div>
          </div>
        </div>
        <div className='form-row-container'>
          <p className='container__label'>Do you recommend this product? *</p>
          <div className='recommend-options-container'>
            <input
              type='radio'
              id='review-yes'
              name='review-recommend'
              value='yes'
              defaultChecked
              onClick={() => setRecommend(true)}>
            </input>
            <label
              id='yesLabel'
              htmlFor='review-yes'
              className='container__label'>
              Yes
            </label>
            <input
              type='radio'
              id='review-no'
              name='review-recommend'
              value='no'
              onClick={() => setRecommend(false)}>
            </input>
            <label
              id='noLabel'
              htmlFor='review-no'
              className='container__label'>
              No
            </label>
          </div>
        </div>
        <div className="form-row-container">
          <label
            id="summaryLabel"
            htmlFor="review-summary"
            className="container__label">
            Review Summary
          </label>
          <input
            className="container__input"
            type='text'
            id="review-summary"
            name='reviewSummary'
            placeholder='Example: Best purchase ever!'
            maxLength='60'/>
        </div>
        <div className="form-row-container">
          <label
            id="bodyLabel"
            htmlFor='review-body'
            className="container__label">
            Review Body *
          </label>
          <textarea
            className="container__input"
            id='review-body'
            name='reviewBody'
            minLength='50'
            maxLength='1000'
            placeholder='Why did you like the product or not?'
            required
            onChange={(e) => setCharCount(e.target.value.length)}>
          </textarea>
          <p id='char-count'>{`( ${charCount} )`}</p>
        </div>
        <div className='form-row-container'>
          <p id='characteristics'className='container__label'>Characteristics</p>
          {factors.map((factor, i) => {
            let grades = factorGrades[factor];
            return (
              <div key={i} className='factor-container'>
                <p className='factor-title'>{factor}</p>
                <div className='factor-radio-container'>
                  {grades.map((grade, i) => {
                    return (
                      <div>
                        <input
                          type='radio'
                          id={grade}
                          name={factor}
                          value={i + 1}>
                        </input>
                        <label
                          htmlFor={grade}
                          className='factor__label'>
                          {grade}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div id='form-buttons-container'>
          <button className="form__photo"
            id="submit-photo"
            type="button"
            value="submit-photo">
            Upload Your Photos
          </button>
          <button className="form__submit"
            id="submit-review"
            type='submit'
            value="submit"
            data-stars={starsCount}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewReviewForm;

//for form submission will need to use : e.target.getAttribute("data-stars"); to send star vote to api