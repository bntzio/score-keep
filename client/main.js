import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

const players = [
  {
    _id: '1',
    name: 'Enrique',
    score: 96
  },
  {
    _id: '2',
    name: 'Sebastian',
    score: 88
  },
  {
    _id: '3',
    name: 'Kasper',
    score: 80
  }
];

const renderPlayers = function(playersList) {
  return playersList.map(function(player) {
    const { name, score } = player;
    return <p key={player._id}>{name} has {score} point(s).</p>;
  });
};

Meteor.startup(function() {
  let jsx = (
    <div>
      <p>{ name }</p>
      { renderPlayers(players) }
    </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
