import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './';

const creatureCard = {
  id: "ebbd44e57df2df1c46f7eaeb7e7847d3c1b2ed46",
  name: "Redoran Enforcer",
  rarity: "Common",
  type: "Creature",
  subtypes: ["Dark Elf"],
  cost: 2,
  power: 2,
  health: 3,
  set: "Core Set",
  imageUrl: "https://images.elderscrollslegends.io/cs/redoran_enforcer.png"
};

const noncreatureCard = {
  id: "ce7be2e72d6b06a52e50bed01952801ca4ecfade",
  name: "Raise Dead",
  rarity: "Legendary",
  type: "Action",
  cost: 2,
  set: "Core Set",
  text: "Summon a random creature from each discard pile.",
  imageUrl: "https://images.elderscrollslegends.io/cs/raise_dead.png"
}

test('displays power and health if health is defined', async () => {
  render(<Card {...creatureCard} />);
  expect(await screen.findByText(/2\/3/i)).toBeTruthy();
});

test('does not display power and health if health is undefined', async () => {
  render(<Card {...noncreatureCard} />);
  expect(screen.queryByText(/2\/3/i)).toBeFalsy();
});

test('displays subtypes if defined', async () => {
  render(<Card {...creatureCard} />);
  expect(await screen.findByText(/Dark Elf/i)).toBeTruthy();
});
