import asyncio
import websockets
import json

async def chat():
    uri = "ws://localhost:8000/chat"
    
    async with websockets.connect(uri) as websocket:
        print("Connected to chat. Type 'quit' to exit.\n")
        
        # Current question context
        question_content = "What is photosynthesis?"
        question_type = "biology"
        
        while True:
            user_input = input("You: ")
            
            if user_input.lower() == "quit":
                break
            
            # Example: change question
            if user_input.lower() == "change":
                question_content = "What is cellular respiration?"
                question_type = "biology"
                continue
            
            # Send message with question context
            message_data = {
                "message": user_input,
                "question_content": question_content,
                "question_type": question_type
            }
            await websocket.send(json.dumps(message_data))
            
            response = await websocket.recv()
            print(f"AI: {response}\n")

if __name__ == "__main__":
    asyncio.run(chat())