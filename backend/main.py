from dotenv import load_dotenv
import json

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from pydantic import BaseModel, ValidationError

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

class ChatMessage(BaseModel):
    message: str = ""
    question_content: str = ""
    question_type: str = ""


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.websocket("/chat")
async def chat(websocket: WebSocket):
    await websocket.accept()
    
    llm = ChatOpenAI(model="gpt-4o-mini")
    
    # TODO: Add better system role
    system_role = "You're a helpful assistant. Answer the user's questions based on the provided context."
    
    messages = [SystemMessage(content=system_role)]
    current_question_content = None
    current_question_type = None
    
    while True:
        message_data = await websocket.receive_text()
        data = json.loads(message_data)
        try:
            data = ChatMessage(**data)
        except ValidationError as e:
            await websocket.send_text(f"Invalid data: {e}")
            continue


        # TODO: Figure out data coming from frontend
        user_message = data.message
        question_content = data.question_content
        question_type = data.question_type
        
        # Check if question context has changed
        if question_content != current_question_content or question_type != current_question_type:
            # Update to new question context
            current_question_content = question_content
            current_question_type = question_type
            messages.append(
                SystemMessage(content=f"New Question: {question_content}\nQuestion Type: {question_type}")
            )
        
        messages.append(HumanMessage(content=user_message))
        
        response = llm.invoke(messages)
        messages.append(AIMessage(content=response.content))
        
        await websocket.send_text(response.content)