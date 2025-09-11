import { useEffect, useState } from "react";
import HelpSection from "./HelpSection";
import TicketsSection from "./TicketsSection";
import { Multiple } from "./Accordion";
import { getFaqCategories } from "utils/supportUserService";

export default function SupportUser() {
  const [filter, setFilter] = useState("all");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { success, data, error } = await getFaqCategories();
      if (success && data?.length) {
        setCategoryOptions(
          data.map((cat) => ({
            label: cat.name,      // depends on API response
            value: cat.key || cat.id,
          }))
        );
      } else {
        console.error("Failed to fetch categories:", error);
        setCategoryOptions([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      <HelpSection />
      <TicketsSection filter={filter} setFilter={setFilter} />
      <Multiple categoryOptions={categoryOptions} />
    </div>
  );
}
