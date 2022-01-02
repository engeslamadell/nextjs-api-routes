import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
// these code will still not be bundled at client side bundle
import { extractFeedback, buildFeedbackPath } from "../api/feedback";

function FeedbackPage(props) {
  // getting the feedback details is just for demostration and practice the dynamic api routes
  // because we already have the details in props.feedbackItems
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedbackData(data.feedback);
      });
  }
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

// you should not use fetch to talk to your own apis inside the api directory
// instead any logic in the api you need, you can implement it directly inside getStaticProps or getServerSideProps
// because everything is already lives in your machine and there is no need fot extra http request
// all said above does not conflict with calling apis outside your project, like we did with calling firebase
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
