import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { token, url } from '/config.js';
import QuestionCard from './QuestionsList/QuestionCard.jsx';
import AddQuestionOrAnswer from './QuestionsList/QuestionCard/AddQuestionOrAnswer.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionCounter: 0,
      searchText: this.props.searchText
    };
    this.onMoreQuestionsClick = this.onMoreQuestionsClick.bind(this);
    this.onCollapseQuestionsClick = this.onCollapseQuestionsClick.bind(this);
    this.onAorQAddition = this.onAorQAddition.bind(this);
  }

  getAllQuestions() {
    axios.get('http://127.0.0.1:3000/qa/questions', {params: { product_id: this.props.product_id, count: 50 }})
      .then(returnedQuestions => {
        this.setState({
          questions: returnedQuestions.data.results,
          questionCounter: 4
        });
      })
      .catch(err => console.error('Error receiving response (QuestionsList.jsx): ', err));
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  componentDidUpdate() {
    if (this.props.searchText !== this.state.searchText) {
      this.setState({
        searchText: this.props.searchText
      });
    }
  }

  onMoreQuestionsClick() {
    if (this.state.questions.length - this.state.questionCounter <= 2) {
      this.setState({
        questionCounter: this.state.questions.length
      });
    } else {
      this.setState({
        questionCounter: this.state.questionCounter + 2
      });
    }
  }

  onCollapseQuestionsClick() {
    this.setState({
      questionCounter: 4
    });
  }

  async onAorQAddition() {
    try {
      const listOfQs = await axios.get('http://127.0.0.1:3000/qa/questions', {params: { product_id: this.props.product_id, count: 50 }});

      this.setState({
        questions: listOfQs.data.results,
        questionCounter: 4
      });

      console.log('Number of Qs: ', this.state.questions.length);
      console.log('Number of Qs s/b: ', listOfQs.data.results.length);
    } catch (err) {
      console.error('Error receiving response (QuestionsList.jsx): ', err);
    }
    console.log('Message received. Spin the wheel again from QL.jsx L62');
    // this.getAllQuestions();
  }


  render() {
    let renderedQuestions;
    if (this.state.searchText.length < 3) {
      let sortedQuestions = this.state.questions.sort((a, b) =>
        b.question_helpfulness - a.question_helpfulness);

      renderedQuestions = sortedQuestions.slice(0, this.state.questionCounter);
    } else {
      let filteredQuestions = this.state.questions.filter(q =>
        q.question_body.toLowerCase().includes(this.state.searchText.toLowerCase())
      );

      let sortedQuestions = filteredQuestions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

      renderedQuestions = sortedQuestions;
    }

    return (
      <>
        <div id='QA-questions-container'>
          {renderedQuestions.map(item => {
            if (item.reported !== true) {
              return (
                <QuestionCard
                  answers={item.answers}
                  asker={item.asker_name}
                  body={item.question_body}
                  date={item.question_date}
                  helpful={item.question_helpfulness}
                  key={item.question_id}
                  reported={item.reported}
                  question_id={item.question_id}
                  product_name={this.props.product_name}
                  onAorQAddition={this.onAorQAddition}
                />
              );
            }
          })}
        </div>
        <div id='QA-questionsBtns-container'>
          {this.state.questions.length <= 4
            ? null :
            this.state.questions.length === this.state.questionCounter
              ? <button id='QA-q-display-btn' onClick={this.onCollapseQuestionsClick}>Collapse Answered Questions</button>
              : <button id='QA-q-display-btn' onClick={this.onMoreQuestionsClick}>More Answered Questions</button>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          <AddQuestionOrAnswer
            questionOrProduct_id={this.props.product_id}
            product_name={this.props.product_name}
            usage={'addQuestion'}
            onAorQAddition={this.onAorQAddition}
          />
        </div>
      </>
    );
  }
}

export default QuestionsList;
