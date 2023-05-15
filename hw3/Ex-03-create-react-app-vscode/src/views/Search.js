import { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import axios from 'axios';
export default function Search() {
  const url = 'https://thronesapi.com/api/v2/Characters';

  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchFailed, setSearchFailed] = useState(false);

  useEffect(() => {
    axios.get(url).then((res) => {
      setCharacters(res.data);
    });
  }, []);

  useEffect(() => {
    if (searchFailed) {
    }
  }, [searchFailed]);

  const handleInput = (input) => {
    const names = input.toLowerCase().split(' ');
    let results = [];
    //Search by exactly first and last name
    if (names.length === 2) {
      results = characters.filter(
        (e) =>
          e.firstName.toLowerCase().includes(names[0]) &&
          e.lastName.toLowerCase().includes(names[1]),
      );
    }
    //Search by either first or last name
    if (names.length === 1) {
      if (names[0] !== '') {
        results = characters.filter(
          (e) =>
            e.firstName.toLowerCase().includes(names[0]) ||
            e.lastName.toLowerCase().includes(names[0]),
        );
      }
    }
    if (results.length === 0) {
      setSearchFailed(true);
    } else {
      setSearchFailed(false);
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
          {filteredCharacters.map((character, index) => {
            return <CharacterCard character={character} index={index} />;
          })}
          {searchFailed && <h2>No characters with that name</h2>}
        </div>
      </div>
    </div>
  );
}
