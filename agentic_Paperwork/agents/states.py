from typing import List, Dict, Any, Optional, TypedDict
from pydantic import BaseModel, Field
from langgraph.graph import MessagesState


class CompletionAssessment(BaseModel):
    """Pydantic model for completion assessor response"""
    has_enough_info: bool = Field(description="Whether there is enough information to answer the question")
    missing_info: Optional[str] = Field(default=None, description="Specific information that is missing")
    follow_up_questions: Optional[str] = Field(default=None, description="Questions to ask to get missing information")
    is_clarification_request: bool = Field(description="Whether the user is requesting clarification about the question")
    
class PaperworkState(MessagesState):
    """State object for the paperwork application"""
    questions: List[Dict[str, Any]]
    current_question_index: int
    current_question: Optional[Dict[str, Any]]
    answer_bank: List[Dict[str, Any]]
    assessment: Optional[CompletionAssessment]
    user_language: str
    completion_status: str  # "incomplete", "complete", "finished"