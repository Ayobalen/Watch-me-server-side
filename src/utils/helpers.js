const randomStringGen = (length) => {
    const pass = 'qwertyuopasdfghjklzxcvbnmQWERTYUOPASDFGHJKLZXCVBNM234567890';
    return Array(length)
      .fill(pass)
      .map((x) => x[Math.floor(Math.random() * x.length)])
      .join('');
  };