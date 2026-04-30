import { message, Tooltip } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import { useBuilder } from "../context/BuilderContext";

import type {
  Category,
  Item,
} from "../context/BuilderContext";

type CategoryListProps = {
  title: Category;
};

export default function CategoryList({
  title,
}: CategoryListProps) {
  const {
    items,
    selectItem,
    current,
    getDisableReason,
  } = useBuilder();

  // filter items from backend
  const categoryItems = items.filter(
    (item: Item) => item.category === title
  );

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      
      <h3 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>

      <div className="space-y-3">
        {categoryItems.map((item) => {
          const selected =
            current.selected[item.category]?.id ===
            item.id;

          const reason =
            getDisableReason(item);

          const disabled = !!reason;

          const handleClick = () => {
            if (disabled) {
              message.warning(reason);

              return;
            }

            const didSelect =
              selectItem(item);

            if (didSelect) {
              message.success(
                `${item.name} selected`
              );
            }
          };

          return (
            <Tooltip
              key={item.id}
              title={reason || ""}
            >
              <div
                tabIndex={0}
                role="button"
                aria-disabled={disabled}
                aria-pressed={selected}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" ||
                    e.key === " "
                  ) {
                    handleClick();
                  }
                }}
                className={`
                  flex items-center justify-between
                  rounded-xl border px-4 py-3
                  transition-all duration-200

                  ${
                    selected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
                      : "border-slate-200 dark:border-slate-700"
                  }

                  ${
                    disabled
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:scale-[1.02]"
                  }

                  text-slate-700 dark:text-slate-200
                `}
              >
                
                <span>{item.name}</span>

                
                <div className="flex items-center gap-2">
                  <span>${item.price}</span>

                  {selected && (
                    <CheckCircleFilled className="text-lg text-blue-500" />
                  )}
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}