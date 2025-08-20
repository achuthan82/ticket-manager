// HelpSection.jsx
function CategoryCard({ icon: Icon, title, subtitle, colorClasses, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-sm text-center 
    transition-all duration-300 ease-in-out 
    hover:shadow-lg hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-base font-semibold text-neutral-900">{title}</div>
          <div className="mt-1 text-sm text-neutral-500">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

export default function HelpSection({ categories }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">How can we help you today?</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.key}
            icon={cat.icon}
            title={cat.title}
            subtitle={cat.subtitle}
            colorClasses={cat.colorClasses}
            onClick={() => console.log('Select category', cat.key)}
          />
        ))}
      </div>
    </div>
  );
}
