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
    const names = input.toLowerCase().split(' ');
    let results = [];
    //Search by exactly first and last name
    if ((names.length = 2)) {
      results = characters.filter(
        (e) =>
          e.firstName.toLowerCase().includes(names[0]) &&
          e.lastName.toLowerCase().includes(names[1]),
      );
    }
    //Search by either first or last name
    if ((names.length = 1)) {
      if (names[0] !== '') {
        results = characters.filter(
          (e) =>
            e.firstName.toLowerCase().includes(names[0]) ||
            e.lastName.toLowerCase().includes(names[0]),
        );
      }
    }
    setFilteredCharacters(results);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1> Search Page</h1>
      <div className="d-flex justify-content-center" id="search-container">
        <div className="container-sm border rounded  p-3 bg-light">
          <h2>Search for a Character</h2>
          <p className="mt-4">
            Enter the names Game of Thrones characters to display their names
            and pictures. Search by first name, last name, or a partial name
            match.
          </p>
          <div className="mt-4">
            <label htmlFor="character-input" className="fw-bold mx-2">
              Character Name:
            </label>
            <input
              className="mb-3"
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
                <div key={index} className="d-flex justify-content-center">
                  <div className="card border-1 m-3 text-center">
                    <img
                      className="card-img-top p-3"
                      src={character.imageUrl}
                      width="400px"
                      height="400px"
                      alt="character"
                    ></img>
                    <div className="card-body">
                      <h4 className="card-title fw-bold">
                        {character.firstName} {character.lastName}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
