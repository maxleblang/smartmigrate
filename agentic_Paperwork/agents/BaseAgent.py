from langchain.chat_models.base import BaseChatModel
from langchain.schema import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate

from abc import ABC, abstractmethod

from agents.states import PaperworkState


class BaseAgent(ABC):
    """Base class for all agents"""
    
    def __init__(self, model: BaseChatModel, logger):
        self.model = model
        self.logger = logger
        self.system_prompt = None
    
    def _get_llm_response(self, prompt: list) -> str:
        """Get response from the language model"""
        try:
            response = self.model.invoke(prompt)
            return response.content
        except Exception as e:
            self.logger.error(f"Error getting LLM response in {self.__class__.__name__}: {e}")
            return "Error processing request"
    
    @abstractmethod
    def process(self, state: PaperworkState) -> PaperworkState:
        """Process the state and return updated state"""
        pass