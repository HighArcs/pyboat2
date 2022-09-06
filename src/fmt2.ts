function condense(prop: object, out: object = {}): object {
  for (const [k, v] of Object.entries(prop)) {
    if (typeof v === "object" && !Array.isArray(v)) {
      let o = condense(v, {});

      for (const [pk, pv] of Object.entries(o)) {
        out[`${k}.${pk}`] = pv;
      }

      continue;
    }

    out[k] = v;
  }

  return out;
}
