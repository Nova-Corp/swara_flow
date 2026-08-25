import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#17152b", color: "#f0a43b", border: "7px solid #f6f0e5", fontFamily: "Georgia", fontSize: 64 }}>
      S
    </div>,
    size,
  );
}
