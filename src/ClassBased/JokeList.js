import React from "react";
import axios from "axios";

class JokeList extends React.Component {
  static defaultProps = {
    maxJokes: 10,
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  componentDidMount() {
    this.getJokes();
  }

  componentDidUpdate() {
    console.log("UPDATED!");
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set(jokes.map(j => j.id));

      while (jokes.length < this.props.maxJokes) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.log("Duplicate Joke!");
        }
      }
      this.setState(jokes);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let jokes = this.state.jokes;
    return (
      <div>
        <h1>Jokes</h1>
        <ul>{jokes.map(j => <li key={j.id}>{j.joke}</li>)}</ul>
      </div>
    );
  }
}

export default JokeList;
