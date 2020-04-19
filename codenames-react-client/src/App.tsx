import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WordList } from './const';
import { Card, CardProps } from './components/Card';
import socketIOClient from "socket.io-client";

interface GameState {
  deck: CardProps[];

}

export class App extends React.Component<{}, GameState> {
  wordList = WordList;
  deck: CardProps[] = [];
  deckSize = 25;
  socket: SocketIOClient.Socket;

  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://localhost:4001');
    this.state = { deck: []};
  }

  componentWillMount() {
    this.socket.on('gameState', (state) => {
      if (state === null) {
        console.log('building deck');
        this.getCards();
        this.setState({ deck: this.deck });
        this.socket.emit('updateState', this.deck);
      } else {
        console.log('retrieving deck', state);

        this.deck = state;
        this.setState({ deck: this.deck });
      }
    });

  }

  render() {

    return <div className="App">
      <div className="deck">{this.deckFactory()}</div>
    </div>
  };

  deckFactory(): JSX.Element[] {
    return this.state.deck.map(
      (card, index) =>
      <Card
        key={index}
        type={card.type}
        text={card.text}
        isFlipped={card.isFlipped}
        callbackFn={this.flipCard.bind(this,index)}
      ></Card>
      );
  }

  flipCard(index) {
    this.deck[index].isFlipped = true;
    this.socket.emit('updateState',this.deck);
    this.setState({deck:this.deck});
  }

  getCards() {

    this.shuffle(this.wordList);
    //get the first 25 of the shuffled deck
    for (let i = 0; i < this.deckSize; i++) {
      let color = "blue";
      if (i > 8) {
        if (i < 17) {
          color = "red";
        }
        else if (i < 24) {
          color = "neutral";
        }
        else {
          color = "assassin";
        }
      }
      this.deck[i] = { text: this.wordList[i].toString(), type: color};
    }

    this.shuffle(this.deck);

  }

  shuffle(array) {
    let rand: number;
    //start from the last card
    for (let i = array.length; i--; i > 0) {
      //get the ith card, and a random index EXCLUDING the ith card (so the card does not shuffle with itself)
      rand = Math.floor(Math.random() * i);
      //swap the random index with current index  
      [array[i], array[rand]] = [array[rand], array[i]];
    }

  }

}

