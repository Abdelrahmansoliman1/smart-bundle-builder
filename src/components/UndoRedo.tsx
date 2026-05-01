import { useBuilder } from "../context/BuilderContext";
import { Button } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
export default function UndoRedo() {
  const { undo, redo, canUndo, canRedo } = useBuilder();

  return (
    <div className="flex gap-2 ">
      <Button
        icon={<UndoOutlined />}
        onClick={undo}
        title="Undo"
        disabled={!canUndo}
      >
        Undo
      </Button>
      <Button
        icon={<RedoOutlined />}
        onClick={redo}
        title="Redo"
        disabled={!canRedo}
      >
        Redo
      </Button>
    </div>
  );
}
