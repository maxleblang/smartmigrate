from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.graph.message import add_messages

from agents.BaseAgent import BaseAgent
from agents.states import PaperworkState


class Assistant(BaseAgent):
    """Agent that interacts with users to gather information or provide clarification"""
    
    def process(self, state: PaperworkState) -> PaperworkState:
        """Interact with the user to gather information or provide clarification"""
        assessment = state["assessment"]
        current_question = state["current_question"]
        user_language = state["user_language"]

        # Determine system prompt
        if assessment.is_clarification_request:
            # User is asking for clarification about the question
            self.system_prompt = f"""
            You are an Assistant helping a user fill out paperwork. The user has requested clarification about the current question.
            
            Current Question: {current_question['question']}
            Question Type: {current_question['type']}
            {f"Options: {current_question['options']}" if current_question.get('options') else ""}
            Language: {user_language}
            
            Provide a helpful clarification or explanation in {user_language}. Focus on:
            - Explaining what the question is asking for
            - Providing examples if helpful
            - Clarifying any confusing terms
            - Helping the user understand what type of information is needed
            
            Be clear, friendly, and focused on helping them understand the question better.
            Do NOT ask for more information - just provide clarification.
            """
        else:
            # User needs to provide more information
            self.system_prompt = f"""
            You are an Assistant helping a user fill out paperwork. You need to gather specific information to answer a paperwork question.
            
            Current Question: {current_question['question']}
            Question Type: {current_question['type']}
            {f"Options: {current_question['options']}" if current_question.get('options') else ""}
            Missing Information: {assessment.missing_info or 'Additional details needed'}
            Suggested Follow-up: {assessment.follow_up_questions or 'Please provide more details'}
            Language: {user_language}
            
            Ask the user a clear, straightforward question in {user_language} to get the missing information needed.
            Be friendly but focused on gathering the specific information identified by the assessor.
            """

        # Get User response
        user_response = input("User: ")

        prompt = [
            SystemMessage(self.system_prompt),
            *state["messages"],
            HumanMessage(user_response)
        ]

        # Add user response to memory
        state["messages"] = add_messages(state.get("messages",[]), [HumanMessage(user_response)])
        
        response = self._get_llm_response(prompt)
        print(f"Assistant: {response}")
        
        return state