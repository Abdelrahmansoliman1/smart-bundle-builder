// components/BudgetBar.tsx
import { Progress } from "antd";
import { useBuilder } from "../context/BuilderContext";

export default function BudgetBar() {
  const { total } = useBuilder();


  const percentage = (total / 1000) * 100;

  const getColor = () => {
    if (percentage < 70) return "#52c41a";
    if (percentage < 90) return "#faad14";
    return "#ff4d4f"; 
      };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition-colors duration-300 dark:bg-slate-900 dark:shadow-none">
      <h3 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Budget Overview</h3>

      <Progress
        percent={percentage}
        format={() => `${percentage.toFixed(0)}%`}
        strokeColor= {getColor()}
        
      />

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">${total} of $1000 used</p>
    </div>
  );
}
