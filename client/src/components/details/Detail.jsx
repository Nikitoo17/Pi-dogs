export default function Detail({
  id,
  image,
  name,
  weight,
  height,
  life_span,
  temperaments,
}) {
  return (
    <div>
      <img src={image} alt="" />
      <div>
        <p>ID: {id}</p>
        <p>NOMBRE: {name}</p>
        <p>PESO: Entre {weight} Kg</p>
        <p>ALTURA: Entre {height} Cm</p>
        <p>AÑOS DE VIDA: {life_span}</p>
        <p>TEMPERAMENTOS: {temperaments}</p>
      </div>
    </div>
  );
}
