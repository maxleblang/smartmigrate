from dotenv import load_dotenv
import json
from io import BytesIO

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pypdf import PdfWriter, PdfReader

# TODO: Better way to handle environment variables (maybe use a config class)
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post("/generate_pdf")
def generate_pdf(pdf_data: dict):
    # Load in pdf field mappings
    with open("i-589_pdf_field_mapping.json", "r") as f:
        alias_map = json.load(f)

    # Map incoming data to PDF fields
    update_dict = {}
    for alias, value in pdf_data.items():
        if isinstance(alias_map[alias], list):
            # Handle checkbox logic
            update_dict.update(alias_map[alias][value])
        else:
            update_dict[alias_map[alias]] = value

    # Generate PDF in memory
    reader = PdfReader("i-589.pdf")
    writer = PdfWriter(reader)
    writer.update_page_form_field_values(writer.pages[0], update_dict)

    # Return PDF as response so the user can download it
    pdf_bytes = BytesIO()
    writer.write(pdf_bytes)
    return Response(
        content=pdf_bytes.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=i-589-filled.pdf"}
    )