/* eslint-disable prefer-template */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function AddTweet() {
  const [tweets, setTweets] = useState([
    {
      title: 'Batman',
      body: 'Alpha',
      date_of_creation: '2000-08-01',
      author: 'Bruce Wayne',
      category: 'entertainment',
    },
  ]);
  const getTweets = () => {
    axios
      .get('/tweet')
      .then((res) => {
        setTweets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const addTweets = (event) => {
    event.preventDefault();
    const tweetObj = {
      title: event.target.title.value,
      body: event.target.body.value,
      date_of_creation: event.target.doc.value,
      author: event.target.author.value,
      category: event.target.category.value,
    };
    axios
      .post('/tweet', tweetObj)
      .then((res) => {
        console.log(res);
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTweets = (index) => {
    axios
      .delete('/tweet/' + index)
      .then((res) => {
        console.log(res.data);
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAll = () => {
    axios
      .put('/tweet/clearAll')
      .then((res) => {
        getTweets();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="add col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Tweet</h1>
        <form onSubmit={addTweets}>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter Title"
          />
          <textarea
            placeholder="Enter body"
            className="form-control"
            name="body"
          />
          <p>Date of Creation</p>
          <input type="date" name="doc" className="form-control" />
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Enter Author Name"
          />
          <select name="category" className="form-control">
            <option value="entertainment">Entertainment</option>
            <option value="study">Study</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
          </select>
          <button type="submit">Add Tweet</button>
        </form>
      </div>

      <div className="data">
        <h1>Tweets</h1>
        <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
          <button type="button" onClick={deleteAll}>
            Clear All
          </button>
        </div>
        <div>
          {tweets.map((val, index) => (
            <div className="row">
              <div className="col-lg-7 col-md-9">
                <div>
                  <small className="text-muted">{val.category}</small>
                </div>
                <div className="text-center">
                  {val.title}
                  <hr className="col-1 border border-info" />
                </div>
                <div>{val.body}</div>
                <div className="text-right pt-5">
                  <span>
                    posted by{' '}
                    <i>
                      <b>{val.author}</b>
                    </i>
                  </span>
                  <br />
                  <span>
                    posted on <b>{val.date_of_creation}</b>
                  </span>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteTweets(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AddTweet;
