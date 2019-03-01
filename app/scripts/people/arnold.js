import Person from '@/people/person';

export default class Arnold extends Person {
  constructor({scene, x, y, sprite} = {}) {
    super({
      scene,
      x,
      y,
      sprite,
      dialogue: {
        'start': 'Hey, what\'s up?',
        'upstairs': 'The workshop? What about it?',
        'ritual': 'I don\'t know much about the ritual. What did you want to know?',
        'arnold': 'I\'m the wizard\'s familiar. As you can see, I am very fluffy.',
        'crystals': 'That idiot upstairs keeps mistaking them for other things and putting them away wrong.',
        'yellow crystal': 'Doesn\'t look anything like a light bulb to me.',
        'wizard': 'Eh, I could take him or leave him',
        'ritual-what': 'Magic? I don\'t know.',
        'reginald': 'Ugh, that idiot. I think he can only see silhouettes.',
        'leave': 'I\'ll talk to you later.'
      },
      questions: {
        'start': {
          'upstairs': 'Ask about upstairs',
          'ritual': 'Ask about the ritual',
          'arnold': 'Ask Arnold about himself',
          'leave': 'Leave'
        },
        'ritual': {
          'crystals': 'Ask where the crystals are',
          'ritual-what': 'Ask what the ritual is for',
          'start': 'Back'
        },
        'upstairs': {
          'reginald': 'Ask about the suit of armor',
          'start': 'Back'
        },
        'arnold': {
          'start': 'Back'
        },
        'crystals': {
          'ritual': 'Back'
        },
        'ritual-what': {
          'ritual': 'Back'
        },
        'yellow crystal': {
          'start': 'Back'
        },
        'reginald': {
          'start': 'Back'
        },
        'wizard': {
          'start': 'Back'
        }
      },
      name: 'Arnold Fuzzybottom',
      description: 'He\'s so fluffy!',
      inventory: []
    });
  }
}
