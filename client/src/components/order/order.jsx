export default function OrderDogs({ order }) {
  const handleChangeOrder = (event) => {
    const eventValue = event.target.value;

    order(eventValue);
  };

  return (
    <div>
      <label>Orden</label>
      <select name="orden" id="1" onChange={handleChangeOrder}>
        <option value="null">-</option>
        <option value="nombre-min">Nombre A-Z</option>
        <option value="nombre-max">Nombre Z-A</option>
        <option value="peso-min">Peso Min/Max</option>
        <option value="peso-max">Peso Max/Min</option>
      </select>
    </div>
  );
}
