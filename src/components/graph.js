import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

function Graph() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Graph of Coins
          </h1>
        </div>
      </header>
      <div className="flex-1 m-5">
        <p>this is the graph component</p>
      </div>
    </>
  );
}

export default Graph;
