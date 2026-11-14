import { describe, expect, it } from "vitest";
import { authErrorMessage, loginSchema, signupSchema } from "./auth-schemas";

describe("signupSchema", () => {
  const valid = { displayName: "Ada", email: "ada@example.com", password: "12345678", confirm: "12345678" };

  it("accepts a valid sign-up", () => {
    expect(signupSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects mismatched passwords on the confirm field", () => {
    const r = signupSchema.safeParse({ ...valid, confirm: "nope-nope" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.path).toEqual(["confirm"]);
  });

  it("rejects short passwords and bad e-mails", () => {
    expect(signupSchema.safeParse({ ...valid, password: "short", confirm: "short" }).success).toBe(false);
    expect(loginSchema.safeParse({ email: "not-an-email", password: "x" }).success).toBe(false);
  });
});

describe("authErrorMessage", () => {
  it("maps known Firebase codes and falls back for unknown ones", () => {
    expect(authErrorMessage({ code: "auth/invalid-credential" })).toBe("E-mail ou mot de passe incorrect.");
    expect(authErrorMessage({ code: "auth/email-already-in-use" })).toMatch(/existe déjà/);
    expect(authErrorMessage(new Error("boom"))).toBe("Une erreur est survenue. Réessaie.");
  });
});
