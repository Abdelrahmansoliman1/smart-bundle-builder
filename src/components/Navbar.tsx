import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useBuilder } from "../context/BuilderContext";
type NavbarProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

export default function Navbar({ dark, setDark }: NavbarProps) {
    const { total } = useBuilder();
  return (
     <div className="mb-6 flex items-center justify-between  bg-white px-6 py-4 shadow-sm transition-colors duration-300 dark:bg-slate-900 dark:shadow-none sticky top-0 z-50 ">
        
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Smart Bundle Builder
      </h1>

      <div className="flex items-center gap-3">
        <p className=" lg:hidden font-bold text-sm text-slate-600 dark:text-slate-300">${total} / $1000</p>
        <Switch
          checked={dark}
          onChange={setDark}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </div>
    </div>
  );
}
 
