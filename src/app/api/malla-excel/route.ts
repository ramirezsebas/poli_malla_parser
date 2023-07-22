import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnT07rxbfF1PqhPSNa4uXZ9qE8TB_7CMFG9DQ75IUESNVwnrG7T2tkklqUD5tcjYCd8c44mmliArQr/pub?output=xlsx",
    ultima_fecha_actualizacion: "22/07/2023",
  });
}
