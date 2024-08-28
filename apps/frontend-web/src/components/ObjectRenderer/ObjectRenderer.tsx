interface ObjectRendererProps<T> {
  data: T;
}

export const ObjectRenderer = <T,>({
  data,
}: ObjectRendererProps<T>): JSX.Element => {
  const renderValue = (value: T): JSX.Element => {
    if (value === null || value === undefined) {
      return <span className="text-gray-500 italic">null</span>;
    }

    if (value instanceof Date) {
      return (
        <span className="text-blue-600">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
            timeStyle: "long",
          }).format(value)}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside ml-4 mt-2">
          {value.map((item, index) => (
            <li className="mb-2" key={index}>
              <ObjectRenderer data={item} />
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <div>
          {Object.entries(value).map(([key, value]) => (
            <div className="mb-4" key={key}>
              <div className="font-semibold text-gray-700">{key}:</div>
              <div className="ml-4 mt-1">{renderValue(value as T)}</div>
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "string") {
      return <span className="text-green-600">"{value}"</span>;
    }

    if (typeof value === "number") {
      return <span className="text-blue-600">{value}</span>;
    }

    if (typeof value === "boolean") {
      return <span className="text-purple-600">{String(value)}</span>;
    }

    return <span>{String(value)}</span>;
  };

  return renderValue(data);
};
