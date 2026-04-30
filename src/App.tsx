import { useEffect, useState } from "react";
import { BuilderProvider } from "./context/BuilderContext";
import Navbar from "./components/Navbar";
import ThemeProvider from "./theme/ThemeProvider";
import "./App.css";
import BudgetBar from "./components/BudgetBar";
import CategoryList from "./components/CategoryList";
import Summary from "./components/Summary";
import UndoRedo from "./components/UndoRedo";
import MobileSummaryBar from "./components/MobileSummaryBar";
import MobileSummaryDrawer from "./components/MobileSummaryDrawer";
import { useBuilder } from "./context/BuilderContext";

function BuilderLayout() {
  const { current, total, undo, redo, canUndo, canRedo } =
    useBuilder();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const itemCount = Object.values(current.selected).length;

  return (
    <>
      <div className="min-h-screen bg-slate-100 p-6 pb-28 transition-colors duration-300 dark:bg-slate-950 lg:pb-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            <CategoryList title="CPU" />
            <CategoryList title="Motherboard" />
            <CategoryList title="RAM" />
            <CategoryList title="GPU" />
            <CategoryList title="Storage" />
            <CategoryList title="PSU" />
            <CategoryList title="Case" />
          </div>

          {/* RIGHT */}
          <div className="hidden self-start space-y-6 lg:sticky lg:top-20 lg:block">
            <UndoRedo />
            <BudgetBar />
            <Summary />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileSummaryBar
          itemCount={itemCount}
          totalPrice={total}
          onClick={() => setIsSummaryOpen(true)}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <MobileSummaryDrawer
          open={isSummaryOpen}
          onClose={() => setIsSummaryOpen(false)}
        />
      </div>
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    window.localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <ThemeProvider dark={dark}>
      <BuilderProvider>
        <Navbar dark={dark} setDark={setDark} />
        <BuilderLayout />
      </BuilderProvider>
    </ThemeProvider>
  );
}
