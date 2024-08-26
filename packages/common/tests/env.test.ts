import { describe, expect, it } from "bun:test";
import { env } from "../src";

describe("env()", () => {
  it("should return the value of an environment variable", () => {
    const key = "TEST_VAR";
    const value = "test-value";

    import.meta.env[key] = value;

    expect(env(key)).toBe(value);

     
    delete import.meta.env[key];
  });

  it("should throw an error if the environment variable is not set", () => {
    const key = "NON_EXISTENT_VAR";

    expect(() => env(key)).toThrowError(
      `Environment variable ${key} is not set`,
    );
  });
});
