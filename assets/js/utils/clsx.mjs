export function clsx(...classes) {
  return classes
    .map((data) => {
      if (typeof data === "string") {
        return data;
      } else if (typeof data === "function") {
        const result = data();

        if (typeof result === "string") {
          return result;
        }
      } else if (data instanceof Object) {
        const arr = [];
        for (const key in data) {
          const cell = data[key];

          if (typeof cell === "function") {
            const result = cell();

            if (typeof result === "string") {
              arr.push(result);
            }
          } else if (Boolean(cell)) {
            arr.push(key);
          }
        }
        return arr;
      }
    })
    .flat(Infinity)
    .filter((v) => typeof v === "string")
    .join(" ");
}
