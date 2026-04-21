export const convertToTitle = id =>
   id
      .split('_')
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');
