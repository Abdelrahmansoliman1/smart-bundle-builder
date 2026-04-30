import { Button, Drawer, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  FilePdfOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useBuilder } from "../context/BuilderContext";
import { exportBuildPdf } from "../utils/exportBuildPdf";

type MobileSummaryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSummaryDrawer({
  open,
  onClose,
}: MobileSummaryDrawerProps) {
  const { current, total, reset } = useBuilder();
  const items = Object.values(current.selected);

  const handleResetConfirm = () => {
    reset();
    message.success("Build reset successfully");
    onClose();
  };

  const handleExportPdf = () => {
    const didOpen = exportBuildPdf(items, total);

    if (!didOpen) {
      message.error("Enable pop-ups to export the PDF");
    }
  };

  return (
    <Drawer
      title="Build Summary"
      placement="bottom"
      height="75vh"
      open={open}
      onClose={onClose}
      className="md:hidden"
    >
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl shadow-sm
          border border-gray-200 dark:border-gray-700
          p-5
          h-fit
        "
      >
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4" />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <div className="text-5xl">
              <InboxOutlined />
            </div>
            <p>No components selected</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pb-4 border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-blue-500">
                ${total}
              </span>
            </div>

            <div className="mb-3">
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                block
                onClick={handleExportPdf}
              >
                Export PDF
              </Button>
            </div>

            <Popconfirm
              title="Reset build?"
              description="Do you really want to reset the current build?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleResetConfirm}
            >
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                block
              >
                Reset Build
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </Drawer>
  );
}
