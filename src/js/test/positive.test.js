import Printer from "../Printer";

test("given correct coords. expect true", async () => {
  await expect(Printer.validateInputGeo("[51.50851, −0.12572]")).resolves.toBe(
    true
  );
});

test("given correct coords. expect true1", async () => {
  await expect(Printer.validateInputGeo("[51.0, −0.12]")).resolves.toBe(true);
});

test("given correct coords. expect true2", async () => {
  await expect(Printer.validateInputGeo("[51, −12]")).resolves.toBe(true);
});

test("given correct coords. expect true3", async () => {
  await expect(Printer.validateInputGeo("[0, 0]")).resolves.toBe(true);
});
