import { extraerMallaGeneral, isFileExcel } from "@/utils/excel_utils";
import { NextResponse } from "next/server";
import * as xlsx from "xlsx";

enum ErrorCode {
  ERROR_FORM_DATA = "ERROR_FORM_DATA",
  ERROR_MISSING_FILE_KEY = "ERROR_MISSING_FILE_KEY",
  ERROR_MISSING_FILE = "ERROR_MISSING_FILE",
  ERROR_MISSING_EXCEL_FILE = "ERROR_MISSING_EXCEL_FILE",
  ERROR_MULTIPLE_FILES = "ERROR_MULTIPLE_FILES",
  ERROR_CONVERT_TO_BYTES = "ERROR_CONVERT_TO_BYTES",
  ERROR_CONVERT_TO_BUFFER = "ERROR_CONVERT_TO_BUFFER",
  ERROR_READ_EXCEL_FILE = "ERROR_READ_EXCEL_FILE",
  ERROR_READ_FILE = "ERROR_READ_FILE",
  ERROR_EXTRACT_MALLA = "ERROR_EXTRACT_MALLA",
}

export async function POST(request: Request) {
  let formData;

  try {
    formData = await request.formData();
  } catch (error: any) {
    return NextResponse.json(
      {
        error_client: "Error al obtener el archivo excel del formdata",
        error: error.toString(),
        error_code: ErrorCode.ERROR_FORM_DATA,
      },
      {
        status: 500,
      }
    );
  }

  if (!formData.has("file")) {
    return NextResponse.json(
      {
        error_client:
          "No se ha enviado ningún archivo (formdata debe tener como clave 'file')",
        error_code: ErrorCode.ERROR_MISSING_FILE_KEY,
      },
      {
        status: 400,
      }
    );
  }

  if (formData.getAll("file").length > 1) {
    return NextResponse.json(
      {
        error_client: "Solo se puede subir un archivo",
        error_code: ErrorCode.ERROR_MULTIPLE_FILES,
      },
      {
        status: 400,
      }
    );
  }

  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      {
        error_client: "No se ha enviado ningún archivo",
        error_code: ErrorCode.ERROR_MISSING_FILE,
      },
      {
        status: 400,
      }
    );
  }

  if (file.length > 1) {
    return NextResponse.json(
      {
        error_client: "Solo se puede subir un archivo",
        error_code: ErrorCode.ERROR_MULTIPLE_FILES,
      },
      {
        status: 400,
      }
    );
  }

  if (!isFileExcel(file)) {
    return NextResponse.json(
      {
        error_client: "El archivo no es un excel",
        error_code: ErrorCode.ERROR_MISSING_EXCEL_FILE,
      },
      {
        status: 400,
      }
    );
  }

  let bytes;

  try {
    bytes = await file.arrayBuffer();
  } catch (error: any) {
    return NextResponse.json(
      {
        error_client: "Error al convertir el archivo excel a bytes",
        error: error.toString(),
        error_code: ErrorCode.ERROR_CONVERT_TO_BYTES,
      },
      {
        status: 500,
      }
    );
  }

  let buffer;
  try {
    buffer = Buffer.from(bytes);
  } catch (error: any) {
    return NextResponse.json(
      {
        error_client: "Error al convertir el archivo excel a buffer",
        error: error.toString(),
        error_code: ErrorCode.ERROR_CONVERT_TO_BUFFER,
      },
      {
        status: 500,
      }
    );
  }

  let workbook;
  try {
    workbook = xlsx.read(buffer, { type: "buffer" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error_client: "Error al leer el archivo excel",
        error: error.toString(),
        error_code: ErrorCode.ERROR_READ_EXCEL_FILE,
      },
      {
        status: 500,
      }
    );
  }
  let mallaGeneral: any = [];
  try {
    mallaGeneral = extraerMallaGeneral(workbook);
  } catch (error: any) {
    return NextResponse.json(
      {
        error_client: "Error al extraer la malla general",
        error: error.toString(),
        error_code: ErrorCode.ERROR_EXTRACT_MALLA,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(mallaGeneral, {
    status: 200,
  });
}
