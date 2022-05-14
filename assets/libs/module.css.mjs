function create_code(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

const classnameRegex = / (\.[a-z0-9-_]*)/ig;

export function addClassPostfixes(string) {
  const postfix = create_code();

  const classNames = {};

  const replacedString = string.replace(classnameRegex, (match, group1) => {
    const newClassname = `${group1.trim()}__${postfix}`;
    classNames[group1.replace('.', '').trim()] = newClassname.replace('.', '').trim();
    return newClassname;
  });

  return [replacedString, classNames];
}

export function makeStyles(callback) {
  // create style tag
  const newStyleTag = document.createElement('style');
  // pushes it to head
  document.head.append(newStyleTag);

  let postfixedMap;
  // return callback which receives props, calculates and replaces css in tag
  return (props) => {
    const recalculated = callback(props);
    if (postfixedMap) {
      let replaced = recalculated;
      Object.entries(postfixedMap).forEach(([key, value]) => {
        replaced = replaced.replace(RegExp(`\\s.${key}\\s`, 'g'), ` .${value} `);
      });
      newStyleTag.textContent = replaced;
    } else {
      const postfixed = addClassPostfixes(recalculated);
      newStyleTag.textContent = postfixed[0];
      postfixedMap = postfixed[1];
    }

    return postfixedMap;
  }
}
