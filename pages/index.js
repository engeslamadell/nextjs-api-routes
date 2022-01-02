import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }
  return (
    <div className={styles.container}>
      <h1>The home page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your emai address</label>
          <input ref={emailInputRef} type="emai" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea
            placeholder="Feedback"
            ref={feedbackInputRef}
            id="feedback"
            rows={5}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
