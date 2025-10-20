import json

from langchain_core.messages import SystemMessage, HumanMessage

from agents.BaseAgent import BaseAgent
from agents.states import PaperworkState, CompletionAssessment


class CompletionAssessor(BaseAgent):
    """Agent that assesses if enough information is available to answer the current question"""
    
    def process(self, state: PaperworkState) -> PaperworkState:
        """Assess if enough information is available to answer the current question"""
        current_question = state["current_question"]
        
        self.system_prompt = f"""
        You are a Completion Assessor for a paperwork application. Analyze the user's responses and determine:
        1. Whether there is enough information to completely answer the paperwork question
        2. What specific information is missing (if any)
        3. What follow-up questions should be asked to get missing information
        4. Whether the user's last input is requesting clarification about the question itself

        Current Question: {current_question['question']}
        Question Type: {current_question['type']}
        {f"Options: {current_question['options']}" if current_question.get('options') else ""}

        Respond with a JSON object matching this structure:
        {{
            "has_enough_info": boolean,
            "missing_info": "string or null",
            "follow_up_questions": "string or null", 
            "is_clarification_request": boolean
        }}

        Guidelines:
        - Set has_enough_info to true only if you can generate a complete, accurate answer
        - Set is_clarification_request to true if the user is asking what the question means, asking for examples, or expressing confusion about what information is needed
        - Be thorough but reasonable in your assessment
        - For missing_info and follow_up_questions, be specific about what information is needed
        """

        prompt = [
            SystemMessage(self.system_prompt),
            *state["messages"]
        ]
        
        response = self._get_llm_response(prompt)
        
        try:
            # Parse the JSON response
            assessment_data = json.loads(response.strip())
            assessment = CompletionAssessment(**assessment_data)
        except (json.JSONDecodeError, Exception) as e:
            self.logger.error(f"Error parsing assessment response: {e}")
            # Fallback assessment
            assessment = CompletionAssessment(
                has_enough_info=False,
                missing_info="Unable to assess response",
                follow_up_questions="Please provide more information",
                is_clarification_request=False
            )
        
        state["assessment"] = assessment
        state["completion_status"] = "complete" if assessment.has_enough_info else "incomplete"
        
        self.logger.info(f"Completion Assessor: {state['completion_status']}, Clarification: {assessment.is_clarification_request}")
        return state