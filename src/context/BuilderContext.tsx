// context/BuilderContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

// ================= TYPES =================

export type Category =
  | "CPU"
  | "Motherboard"
  | "RAM"
  | "GPU"
  | "Storage"
  | "PSU"
  | "Case";

export type Item = {
  id: string;
  name: string;
  price: number;
  category: Category;
  incompatibleWith: string[];
};

type SelectedItems = Partial<
  Record<Category, Item>
>;

type State = {
  selected: SelectedItems;
};

type BuilderContextType = {
  items: Item[];
  loading: boolean;

  current: State;

  total: number;

  selectItem: (
    item: Item
  ) => boolean;

  getDisableReason: (
    item: Item
  ) => string | null;

  canUndo: boolean;
  canRedo: boolean;

  undo: () => void;
  redo: () => void;
  reset: () => void;
};

// ================= CONSTANTS =================

const MAX_BUDGET = 1000;

// ================= CONTEXT =================

const BuilderContext = createContext<
  BuilderContextType | undefined
>(undefined);

// ================= PROVIDER =================

export const BuilderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // items from backend
  const [items, setItems] = useState<Item[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  // undo/redo history
  const [history, setHistory] = useState<
    State[]
  >([{ selected: {} }]);

  const [index, setIndex] = useState(0);

  // ================= FETCH =================

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch items
        const itemsRes = await fetch(
          "http://localhost:3001/items"
        );

        const itemsData =
          await itemsRes.json();

        // fetch build
        const buildRes = await fetch(
          "http://localhost:3001/build"
        );

        const buildData =
          await buildRes.json();

        setItems(itemsData);

        // restore saved build
        if (
          buildData.history &&
          buildData.index !== undefined
        ) {
          setHistory(buildData.history);

          setIndex(buildData.index);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= CURRENT =================

  const current = history[index];

  const canUndo = index > 0;

  const canRedo =
    index < history.length - 1;

  // ================= TOTAL =================

  const total = Object.values(
    current.selected
  ).reduce(
    (sum, item) =>
      sum + (item?.price || 0),
    0
  );

  // ================= SAVE BUILD =================

  const saveBuild = async (
    newHistory: State[],
    newIndex: number
  ) => {
    try {
      await fetch(
        "http://localhost:3001/build",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            selected:
              newHistory[newIndex]
                .selected,

            history: newHistory,

            index: newIndex,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DISABLE REASON =================

  const getDisableReason = (
    item: Item
  ): string | null => {
    const currentItem =
      current.selected[item.category];

    // same selected item
    if (currentItem?.id === item.id) {
      return null;
    }

    // budget
    const newTotal =
      total -
      (currentItem?.price || 0) +
      item.price;

    if (newTotal > MAX_BUDGET) {
      return "Exceeds budget";
    }

    // incompatibility
    const conflictingItems =
      Object.values(
        current.selected
      ).filter(
        (selected) =>
          selected &&
          (selected.incompatibleWith.includes(
            item.id
          ) ||
            item.incompatibleWith.includes(
              selected.id
            ))
      );

    if (conflictingItems.length > 0) {
      const names = conflictingItems
        .map(
          (selected) => selected.name
        )
        .join(", ");

      return `Incompatible with ${names}`;
    }

    return null;
  };

  // ================= SELECT =================

  const selectItem = (item: Item) => {
    const reason =
      getDisableReason(item);

    if (reason) return false;

    const currentItem =
      current.selected[item.category];

    // already selected
    if (currentItem?.id === item.id) {
      return false;
    }

    const newSelected: SelectedItems = {
      ...current.selected,

      [item.category]: item,
    };

    const newHistory = history.slice(
      0,
      index + 1
    );

    newHistory.push({
      selected: newSelected,
    });

    setHistory(newHistory);

    setIndex(index + 1);

    // save backend
    saveBuild(newHistory, index + 1);

    return true;
  };

  // ================= UNDO =================

  const undo = () => {
    if (!canUndo) return;

    const newIndex = index - 1;

    setIndex(newIndex);

    saveBuild(history, newIndex);
  };

  // ================= REDO =================

  const redo = () => {
    if (!canRedo) return;

    const newIndex = index + 1;

    setIndex(newIndex);

    saveBuild(history, newIndex);
  };

  // ================= RESET =================

  const reset = () => {
    const initialHistory = [
      { selected: {} },
    ];

    setHistory(initialHistory);

    setIndex(0);

    saveBuild(initialHistory, 0);
  };

  // ================= PROVIDER =================

  return (
    <BuilderContext.Provider
      value={{
        items,
        loading,

        current,

        total,

        selectItem,

        getDisableReason,

        canUndo,
        canRedo,

        undo,
        redo,

        reset,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

// ================= HOOK =================

export const useBuilder = () => {
  const context =
    useContext(BuilderContext);

  if (!context) {
    throw new Error(
      "useBuilder must be used within BuilderProvider"
    );
  }

  return context;
};