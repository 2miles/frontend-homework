/**
 * Uses array destructuring and the Set constructor to remove duplicates
 * from an array.
 */
export const removeDupes = function removeDupes(arr) {
  return [...new Set(arr)];
};

/**
 * Returns an array of family names with typos removed and everyone who is not
 * in a house has house name changed to 'No House'.
 * This function works by first making sure that every house family member name
 * starts with 'House ' and is spelled correctly, then removes any family names
 * that don't start with house and sorts the remaining alphabetically.
 */
export const cleanNames = function cleanNames(data) {
  const result = [];
  data.forEach((name) => {
    let goodName = name;
    if (name.includes('Targar')) {
      goodName = 'House Targaryen';
    }
    if (name.includes('Lan')) {
      goodName = 'House Lannister';
    } else if (name.includes('Stark')) {
      goodName = 'House Stark';
    } else if (name.includes('Bara')) {
      goodName = 'House Baratheon';
    } else if (name.includes('Grey')) {
      goodName = 'House Greyjoy';
    } else if (name.includes('Tyrell')) {
      goodName = 'House Tyrell';
    } else if (!name.includes('House')) {
      goodName = 'No House';
    }
    result.push(goodName);
  });
  return result.filter((name) => name.includes('House')).sort();
};

/**
 * Return a array of counts of people in each house.
 */
export const buildCountList = function buildCountList(people, houses) {
  const counts = [];
  houses.forEach((houseName, index) => {
    counts[index] = 0;
    people.forEach((name) => {
      if (name === houseName) {
        counts[index] += 1;
      }
    });
  });
  return counts;
};
