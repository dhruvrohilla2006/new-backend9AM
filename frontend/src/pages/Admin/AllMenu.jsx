import { useEffect, useMemo, useState } from "react";
// import FoodCard from "../../components/FoodCard";
import menuStore from "../../store/menuStore.js";
import { Pencil, Trash2 } from "lucide-react";

const Menu = () => {
  const { menuData, getAllMenu, deleteFood } = menuStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [availability, setAvailability] = useState("all");

  // Use Zustand data directly
  const foods = menuData ?? [];

  const handleEdit = (food) => {
    console.log("Edit food:", food);
    // Navigate to your edit page or open an edit modal.
  };

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

      return matchesSearch && matchesCategory && matchesAvailability;
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
            <FoodCard
              key={food._id}
              food={food}
              onEdit={handleEdit}
              onDelete={deleteFood}
            />
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

const FoodCard = ({ food, onEdit, onDelete }) => {
  const { name, description, price, isAvailable, category, images = [] } = food;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Food Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={images[0] || "/food-placeholder.png"}
          alt={name}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            !isAvailable ? "grayscale-[30%]" : ""
          }`}
          onError={(e) => {
            e.currentTarget.src = "/food-placeholder.png";
          }}
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
          {category}
        </span>

        {/* Admin Actions */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(food)}
            aria-label={`Edit ${name}`}
            title="Edit food"
            className="rounded-lg bg-white p-2 text-blue-600 shadow-md transition hover:bg-blue-50 active:scale-95"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(food._id)}
            aria-label={`Delete ${name}`}
            title="Delete food"
            className="rounded-lg bg-white p-2 text-red-600 shadow-md transition hover:bg-red-50 active:scale-95"
          >
            <Trash2 size={17} />
          </button>
        </div>

        {/* Availability */}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
            isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Food Details */}
      <div className="flex flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>

          <span className="shrink-0 text-lg font-bold text-orange-600">
            ₹{Number(price).toFixed(0)}
          </span>
        </div>

        <p className="mt-2 min-h-16 text-sm leading-6 text-gray-500">
          {description}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs font-medium text-gray-400">
            Menu item ID: {food._id}
          </p>
        </div>
      </div>
    </div>
  );
};
