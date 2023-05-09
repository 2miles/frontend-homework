export default function CharacterCard(props) {
  return (
    <div key={props.index} className="d-flex justify-content-center">
      <div className="card border-1 m-3 text-center">
        <img
          className="card-img-top p-3"
          src={props.character.imageUrl}
          width="400px"
          height="400px"
          alt="character"
        ></img>
        <div className="card-body">
          <h4 className="card-title fw-bold">
            {props.character.firstName} {props.character.lastName}
          </h4>
        </div>
      </div>
    </div>
  );
}
