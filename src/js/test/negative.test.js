import Printer from "../Printer";

test("given: wrong input. expected: error1", async () => {
  await expect(Printer.validateInputGeo("123")).rejects.toThrow(
    "wrong input geodata. missed symbol."
  );
});

test("given: wrong input. expected: error2", async () => {
  await expect(Printer.validateInputGeo("_230-59_)$89")).rejects.toThrow(
    "wrong input geodata. missed symbol."
  );
});

test("given: missed space. expected: error", async () => {
  await expect(Printer.validateInputGeo("[51.50851,−0.12572]")).rejects.toThrow(
    "wrong input geodata. missed symbol."
  );
});

test("given: letters in coords. expected: error", async () => {
  await expect(
    Printer.validateInputGeo("[51.5085q, −0.1257p]")
  ).rejects.toThrow("wrong input geodata. letters not allowed.");
});

test("given: > 2 dots. expected: error", async () => {
  await expect(
    Printer.validateInputGeo("[51.50.851, −0.12.571]")
  ).rejects.toThrow("wrong input geodata. more than 2 dots.");
});

test("given: 3 coords. expected: error", async () => {
  await expect(
    Printer.validateInputGeo("[51.50851, −0.12571, 25.12345]")
  ).rejects.toThrow("wrong input geodata. more than 2 dots.");
});

test("given: empty coords. expected: error", async () => {
  await expect(Printer.validateInputGeo("[, ]")).rejects.toThrow(
    "wrong input geodata. digits not found."
  );
});

test("given: empty coords. expected: error1", async () => {
  await expect(Printer.validateInputGeo("")).rejects.toThrow(
    "illegal geodata:"
  );
});
