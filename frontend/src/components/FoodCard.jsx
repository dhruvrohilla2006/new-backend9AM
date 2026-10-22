
const FoodCard = ({ food }) => {
  const {
    name,
    description,
    price,
    isAvailable,
    category,
    images = [],
  } = food;

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

        {/* Availability */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
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
          <h2 className="text-lg font-bold text-gray-900">
            {name}
          </h2>

          <span className="shrink-0 text-lg font-bold text-orange-600">
            ₹{Number(price).toFixed(0)}
          </span>
        </div>

        <p className="mt-2 min-h-16 text-sm leading-6 text-gray-500">
          {description}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <button
            type="button"
            disabled={!isAvailable}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              isAvailable
                ? "bg-orange-500 text-white hover:bg-orange-600 active:scale-[0.98]"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            {isAvailable ? "Add to Cart" : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
