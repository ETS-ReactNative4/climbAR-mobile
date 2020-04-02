export const emailId = email => {
  const chars = 'abcdefghijklmnopABCDEFGHIJKLMNOP0123456789-';
  let randomString = Array.from({length: 10})
    .map(_e => chars[Math.floor(Math.random() * chars.length)])
    .join('');
  const id = email + randomString;
  return id;
};
