import { Activity, HardHat, Wrench } from "lucide-react";

const equipment = [
  {
    name: "Ventilation System",
    status: "Online",
    icon: Activity,
  },
  {
    name: "Safety Gear",
    status: "Checked",
    icon: HardHat,
  },
  {
    name: "Drilling Unit",
    status: "Maintenance",
    icon: Wrench,
  },
];

function EquipmentDetails() {
  return (
    <section className="flex h-full w-full flex-col gap-3 rounded-lg bg-gray-500 p-4">
      <div className="flex items-center justify-between rounded-lg bg-gray-400 px-4 py-3 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-black/60">Equipment</h2>
          <p className="text-sm font-medium text-gray-700">Current readiness</p>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          85%
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {equipment.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.name}
              className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <Icon size={20} />
                </div>
                <p className="font-semibold text-zinc-800">{item.name}</p>
              </div>
              <span className="text-sm font-bold text-gray-500">
                {item.status}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default EquipmentDetails;
