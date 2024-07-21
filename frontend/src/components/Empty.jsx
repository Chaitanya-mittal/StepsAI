function Empty({ resource }) {
  return (
    <p className="border bg-white p-8 text-center font-mono text-sm italic">
      No {resource} could be found :(
    </p>
  );
}

export default Empty;
