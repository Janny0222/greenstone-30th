import React from "react";

const Rows = ({ data, i, rowRender }) => {
  return <tr key={i}>{rowRender ? rowRender(data, i) : <></>}</tr>;
};
const Table = ({ tableHead, data, rowRender }) => {
  const Head = "text-xs text-left text-[#169216] font-bold px-6 py-2 uppercase";
 
  if (!data) return null;
  return (
    <div className="overflow-x-scroll overflow-y-scroll h-[500px] overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead className="border-black">
          <tr className="bg-white">
            {tableHead?.map((head, index) => (
              <th key={index} scope="col" className={`${Head}`}>
                {head?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, index) => (
            <Rows key={index} data={data} i={index} rowRender={rowRender} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
