import { useEffect, useState } from 'react';

export default function Search() {
  const url = 'https://thronesapi.com/api/v2/Characters';

  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  const handleInput = (input) => {
    const names = input.split(' ');
    let results = [];
    //Search by exactly first and last name
    if ((names.length = 2)) {
      results = characters.filter(
        (e) => e.firstName.includes(names[0]) && e.lastName.includes(names[1]),
      );
    }
    //Search by either first or last name
    if ((names.length = 1)) {
      if (names[0] !== '') {
        results = characters.filter(
          (e) =>
            e.firstName.includes(names[0]) || e.lastName.includes(names[0]),
        );
      }
    }
    setFilteredCharacters(results);
  };

  return (
    <div>
      <h1> Search Page</h1>
      <div className="d-flex justify-content-center">
        <div className="container-sm border rounded  p-3 bg-light">
          <h2>Search for a Character</h2>
          <p className="mt-4">
            Enter the name of a Game of Thrones character to display their name
            and picture.
          </p>
          <div className="mt-4">
            <label htmlFor="character-input">Character Name:</label>
            <input
              id="character-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInput(e.target.value);
                }
              }}
            />
          </div>
          <div>
            {filteredCharacters.map((character, index) => {
              return (
                <div key={index}>
                  {character.firstName} {character.lastName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
