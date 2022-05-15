<template>
  <Header title="Happy Family!"/>
  <div class="rules">
    <h2>Roles</h2>
      <details>
        <summary>Click here to expand/collapse</summary>
          <h4>Game Master</h4>
          <ul>
            <li>When you start a new game, you will be given a phrase made up by an adjective and a noun (ex: PaleDisk). This is the password to join your game.</li>
            <li>You are in charge of the game, and will be given a slightly different game screen than other participants.</li>
            <li>You make sure every participant submits a word (including yourself).</li>
            <li>You are not supposed to know who wrote down which word.</li>
            <li>When every participant (including yourself) has submitted a word, you are responsible for reading the words out loud. Read the list twice.</li>
            <li>You (or anyone else) are not allowed to re-read the list of words submitted later in the game. They are only supposed to be read before the round starts.</li>
          </ul>
          <h4>Participant</h4>
            <ul>
              <li>Enter the phrase/password given to you by the Game Master to join the game (ex: PaleDisk).</li>
              <li>You are supposed to submit a single word or a short phrase. This is your word, keep it a secret.</li>
              <li>When it is your turn to be The Guesser, you guess a word on another participant.</li>
              <li>Do not reveal which word is yours.</li>
            </ul>
          <h4>The Guesser</h4>
            <ul>
              <li>The Guesser is the person currently guessing who wrote down which word. You are free to pick whichever word from the list.</li>
              <li>In the first round the youngest person in the room is the guesser.</li>
              <li>In subsequent rounds either the winner from last round starts or feel free to pick by some other means.</li>
              <li>If you guess right you have expanded your family, and they can help you figure out which person wrote down what. You are a team.</li>
              <li>If you get the role after someone else who figured out which participant owns a word or phrase, you are allowed (and encouraged) to "guess" the same word on the same participant to expand your family before doing any other guesses.</li>
              <li>If you guess wrong, the role (The Guesser) is passed to the person you guessed wrong on.</li>
              <li>You are allowed to "guess" your own word on another participant to confuse or deceive other participants.</li>
            </ul>
          <h4>Family Member</h4>
            <ul>
              <li>You help The Guesser find out who might owns the remaining words or phrases, or help them remember which words were written down.</li>
              <li>Only family members are allowed to help The Guesser or talk during the round.</li>
              <li>As a result of having your word figured out, you will most likely be a part of every subsequent family for the rest of the game.</li>
            </ul>
            <h4>Winner</h4>
            <p>The one who expands their family to include every participant is the winner.</p>
      </details>

    <h2>Rules</h2>
        <p>Make sure you read the list of Roles, they explain the game quite well.</p>
        <details>
          <summary>Click here to expand/collapse</summary>
          <p>You are allowed to guess your own word on someone else to confuse or deceive others.</p>
          <p>If participant #1 guesses the correct word on participant #2, but guesses wrong on you later, you are allowed to "guess" on participant #2 to include them in your family.</p>
        </details>
        
        
    <h2>Drinking game</h2>
        <details>
          <summary>Click here to expand/collapse</summary>
          <p>Suggestions for making this into a drinking game</p>
          <ul>
            <li>Every time you guess wrong you have to take two sips. Every family member has to take one sip.</li>
            <li>If you guess wrong on a participant which word is already known you (The Guesser) has to take 5 sips (i.e. a previous Guesser had them in their family).</li>
            <li>If you and your family spends more than 30 seconds trying to remember a word or phrase, every family member (including The Guesser) has to take a drink for every word you can't remember. (i.e. if you only forgot one word - take one sip. If you forgot two - take two sips, etc.</li>
          </ul>
          <p>Feel free to adapt these rules as you see fit.</p>
        </details>

  </div>
</template>

<script lang="ts">

import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  }
}
</script>
