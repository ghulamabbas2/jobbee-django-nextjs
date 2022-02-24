import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0),
        sameSite: "Lax",
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: true,
    });
  }
};
