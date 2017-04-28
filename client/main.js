import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from './../imports/api/players';

const renderPlayers = playersList => {
  return playersList.map(player => {
    const { _id, name, score } = player;

    return (
      <p key={_id}>
        {name} has {score} point(s).
        <button onClick={() => {
          Players.update({ _id }, {
            $inc: { score: -1 }
          });
        }}>-1</button>
        <button onClick={() => {
          Players.update({ _id }, {
            $inc: { score: 1 }
          });
        }}>+1</button>
        <button onClick={() => Players.remove({ _id })}>x</button>
      </p>
    );
  });
};

const handleSubmit = ev => {
  let playerName = ev.target.playerName.value;

  ev.preventDefault();

  if (playerName) {
    ev.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

Meteor.startup(() => {
  Tracker.autorun(() => {
    const players = Players.find().fetch();

    let jsx = (
      <div>
        { renderPlayers(players) }
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name" />
          <button type="submit">Add Player</button>
        </form>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
