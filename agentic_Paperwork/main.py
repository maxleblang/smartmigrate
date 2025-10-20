import json
from typing import List, Dict, Any, Optional, TypedDict

from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

import logging
from dotenv import load_dotenv

from agents.states import PaperworkState
from agents.BaseAgent import BaseAgent
from agents.CompletionAssessor import CompletionAssessor
from agents.Assistant import Assistant
from agents.CompleteAnswerGenerator import CompleteAnswerGenerator

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class QuestionManager:
    """Handles question progression and state management"""
    
    @staticmethod
    def next_question(state: PaperworkState) -> PaperworkState:
        """Move to the next question or finish if all questions are answered"""
        state["current_question_index"] += 1
        
        if state["current_question_index"] >= len(state["questions"]):
            state["completion_status"] = "finished"
        else:
            state["current_question"] = state["questions"][state["current_question_index"]]
            state["completion_status"] = "incomplete"
            # Clear previous question context
            state["assessment"] = None
        
        return state

class PaperworkApplication:
    """Main application class for the agentic paperwork system"""
    
    def __init__(self, model_name: str = "gpt-4o-mini", user_language: str = "English"):
        self.model = init_chat_model(model_name, temperature=0)
        self.user_language = user_language
        
        # Initialize agents
        self.completion_assessor = CompletionAssessor(self.model, logger)
        self.assistant = Assistant(self.model, logger)
        self.complete_answer_generator = CompleteAnswerGenerator(self.model, logger)
        self.question_manager = QuestionManager()
        self.memory = MemorySaver()
        
        self.workflow = self._build_workflow()
        
    def _build_workflow(self) -> StateGraph:
        """Build the LangGraph workflow"""
        workflow = StateGraph(state_schema=PaperworkState)
        
        # Add nodes - these now call the agent classes
        workflow.add_node("completion_assessor", self.completion_assessor.process)
        workflow.add_node("assistant", self.assistant.process)
        workflow.add_node("complete_answer_generator", self.complete_answer_generator.process)
        workflow.add_node("next_question", self.question_manager.next_question)
        
        # Set entry point
        workflow.set_entry_point("completion_assessor")
        
        # Add conditional edges
        workflow.add_conditional_edges(
            "completion_assessor",
            self._route_from_assessor,
            {
                "assistant": "assistant",
                "complete_answer_generator": "complete_answer_generator"
            }
        )
        
        workflow.add_edge(
            "assistant",
            "completion_assessor"
        )
        
        workflow.add_edge("complete_answer_generator", "next_question")
        
        workflow.add_conditional_edges(
            "next_question",
            self._route_from_next_question,
            {
                "completion_assessor": "completion_assessor",
                "end": END
            }
        )
        
        return workflow.compile(checkpointer=self.memory)
    
    def _route_from_assessor(self, state: PaperworkState) -> str:
        """Route from completion assessor based on assessment"""
        assessment = state["assessment"]
        if assessment.has_enough_info:
            return "complete_answer_generator"
        else:
            return "assistant"
    
    def _route_from_next_question(self, state: PaperworkState) -> str:
        """Route from next question based on completion status"""
        if state["completion_status"] == "finished":
            return "end"
        else:
            return "completion_assessor"
    
    def run_paperwork_session(self, questions_json: str) -> Dict[str, Any]:
        """Run a complete paperwork session"""
        try:
            questions = json.loads(questions_json)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {e}")
        
        if not questions or len(questions) == 0:
            raise ValueError("No questions provided")
        
        # Initialize state
        initial_state = PaperworkState(
            questions=questions,
            current_question_index=0,
            current_question=questions[0],
            response_history=[],
            answer_bank=[],
            assessment=None,
            user_language=self.user_language,
            last_user_input="",
            completion_status="incomplete"
        )
        
        # Run the workflow
        final_state = self.workflow.invoke(initial_state, config={
            "configurable": {
                "thread_id": "defualt"
            }
        })
        
        return {
            "status": "completed",
            "answers": final_state["answer_bank"],
            "total_questions": len(questions),
            "questions_answered": len(final_state["answer_bank"])
        }

# Example usage and testing
def example_usage():
    """Example of how to use the paperwork application"""
    
    # Sample questions JSON
    sample_questions = [
        {
            "id": "q1",
            "question": "What is your full legal name?",
            "type": "short_answer",
            "options": None
        },
        {
            "id": "q2", 
            "question": "What is your date of birth?",
            "type": "short_answer",
            "options": None
        },
        {
            "id": "q3",
            "question": "What is your preferred contact method?",
            "type": "multiple_choice",
            "options": ["Email", "Phone", "Mail"]
        }
    ]
    
    # Initialize application
    app = PaperworkApplication(user_language="English")
    
    # Run paperwork session
    questions_json = json.dumps(sample_questions)
    
    try:
        result = app.run_paperwork_session(questions_json)
        print("Paperwork session completed!")
        print(f"Status: {result['status']}")
        print(f"Questions answered: {result['questions_answered']}/{result['total_questions']}")
        print("\nAnswers:")
        for answer in result['answers']:
            print(f"Question {answer['question_id']}: {answer['generated_answer']}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    example_usage()