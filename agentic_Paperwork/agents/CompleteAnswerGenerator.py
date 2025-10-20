from langchain_core.messages import SystemMessage, HumanMessage

from agents.BaseAgent import BaseAgent
from agents.states import PaperworkState

class CompleteAnswerGenerator(BaseAgent):
    """Agent that generates complete answers using all available user information"""
    
    def process(self, state: PaperworkState) -> PaperworkState:
        """Generate a complete answer using all available user information"""
        current_question = state["current_question"]
        
        self.system_prompt = f"""
        You are a Complete Answer Generator for a paperwork application. Generate a thorough, complete answer to the paperwork question using ONLY the information provided by the user.

        Question: {current_question['question']}
        Question Type: {current_question['type']}
        {f"Options: {current_question['options']}" if current_question.get('options') else ""}

        Generate a complete answer in English that accurately answers the paperwork question based on the user's responses. 
        For multiple choice questions, provide the selected option.
        For short answers, provide a concise response.
        For long answers, provide a comprehensive response.
        
        Only use information the user has explicitly provided. Do not make assumptions or add information not given by the user.
        """

        # Construct prompt with memory
        prompt = [
            SystemMessage(self.system_prompt),
            *state["messages"],
        ]
        
        generated_answer = self._get_llm_response(prompt)
        
        # Store in answer bank
        answer_entry = {
            "generated_answer": generated_answer.strip(),
            "question_id": current_question["id"]
        }
        
        state["answer_bank"].append(answer_entry)
        self.logger.info(f"Answer generated for question {current_question['id']}")
        
        return state