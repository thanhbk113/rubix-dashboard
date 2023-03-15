const Checkbox = ({ content }: { content: string }) => {
  return (
    <div className="flex gap-2 pl-2 text-xs text-gray-500">
      <input type="checkbox" />
      <p>{content}</p>
    </div>
  );
};

export default Checkbox;
