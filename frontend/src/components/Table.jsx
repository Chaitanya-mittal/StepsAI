function Table({ columns, headers, data, render }) {
  return (
    <ul className="w-full">
      <li
        className={`grid w-full grid-cols-[${columns}] gap-4 border bg-blue-500 p-4 font-mono text-sm font-bold`}
      >
        {headers.map((header) => (
          <div key={header}>{header}</div>
        ))}
      </li>
      <>{data.map(render)}</>
    </ul>
  );
}

export default Table;
