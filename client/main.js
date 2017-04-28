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

Meteor.startup(function() {
  Tracker.autorun(function() {
    const players = Players.find().fetch();

    let jsx = (
      <div>
        { renderPlayers(players) }
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

  Players.insert({
    name: 'Sebastian',
    score: 88
  });
});
