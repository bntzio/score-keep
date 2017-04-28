import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from './../imports/api/players';

const renderPlayers = function(playersList) {
  return playersList.map(function(player) {
    const { name, score } = player;
    return <p key={player._id}>{name} has {score} point(s).</p>;
  });
};

const handleSubmit = function(ev) {
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

Meteor.startup(function() {
  Tracker.autorun(function() {
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
