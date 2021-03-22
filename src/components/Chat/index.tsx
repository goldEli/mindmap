import { data } from "./data";
import { useMindMap } from "./useMindMap";

export default function () {
  const {
    ref,
    action: { getData, onAdd, onDel }
  } = useMindMap(data);

  const onOk = () => {
    const res = getData();
    console.log(res);
  };
  return (
    <>
      <div>
        <button onClick={onAdd}>add</button>
        <button onClick={onDel}>delete</button>
        <button onClick={onOk}>ok</button>
      </div>
      <div ref={ref}></div>
    </>
  );
}
