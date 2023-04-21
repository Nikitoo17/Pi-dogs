export default function FilterDogs({ filterData }) {
  const handleAll = () => {
    filterData("all");
  };
  const handleApi = () => {
    filterData("api");
  };
  const handleDb = () => {
    filterData("db");
  };
  return (
    <div>
      <button onClick={handleAll}>ALL</button>
      <button onClick={handleApi}>API</button>
      <button onClick={handleDb}>DB</button>
    </div>
  );
}
