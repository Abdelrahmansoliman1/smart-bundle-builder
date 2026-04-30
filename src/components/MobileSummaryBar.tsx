import { Badge, Button } from "antd";
import {
  RedoOutlined,
  ShoppingCartOutlined,
  UndoOutlined,
} from "@ant-design/icons";

type MobileSummaryBarProps = {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export default function MobileSummaryBar({
  itemCount,
  totalPrice,
  onClick,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: MobileSummaryBarProps) {
  return (
    <div
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-slate-200 bg-white/95 px-4 py-3
        shadow-sm backdrop-blur
        transition-colors duration-300
        dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none
      "
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            type="text"
            shape="circle"
            icon={<UndoOutlined />}
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo"
            className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 shadow-sm dark:border-slate-700 dark:text-slate-200"
          />
          <Button
            type="text"
            shape="circle"
            icon={<RedoOutlined />}
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Redo"
            className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 shadow-sm dark:border-slate-700 dark:text-slate-200"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Total
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${totalPrice}
            </p>
          </div>
        </div>

        <Badge count={itemCount} showZero>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="large"
            onClick={onClick}
            className="h-11 rounded-xl px-5 font-semibold shadow-sm"
          >
            View Summary
          </Button>
        </Badge>
      </div>
    </div>
  );
}
