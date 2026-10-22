
import { useEffect, useMemo, useState } from "react";
import FoodCard from "../../components/FoodCard";
import menuStore from "../../store/menuStore";

const Menu = () => {
  const { menuData, getAllMenu } = menuStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [availability, setAvailability] = useState("all");

  // Use Zustand data directly
  const foods = menuData ?? [];

  useEffect(() => {
    getAllMenu();
  }, [getAllMenu]);

  const categories = useMemo(
    () => [
      "ALL",
      ...new Set(
        foods
          .map((food) => food.category)
          .filter((category) => category && category !== "ALL"),
      ),
    ],
    [foods],
  );

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch =
        food.name?.toLowerCase().includes(search.toLowerCase()) ||
        food.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" ||
        food.category === selectedCategory ||
        food.category === "ALL";

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && food.isAvailable) ||
        (availability === "unavailable" && !food.isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [foods, search, selectedCategory, availability]);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Fresh & Delicious
        </p>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Food Menu
            </h1>
            <p className="mt-2 text-gray-500">
              Discover your favorites and explore something new.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredFoods.length}{" "}
            {filteredFoods.length === 1 ? "item" : "items"} found
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food by name or description..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-400"
          >
            <option value="all">All items</option>
            <option value="available">Available only</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {filteredFoods.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="text-5xl">🍽️</div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No food items found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("ALL");
              setAvailability("all");
            }}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Clear Filters
          </button>
        </section>
      )}
    </div>
  );
};

export default Menu;
