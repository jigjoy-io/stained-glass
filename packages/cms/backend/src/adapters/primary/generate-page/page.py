from pydantic import BaseModel, Field
import uuid
from abc import ABC, abstractmethod
from typing import Optional, List, Union


class BuildingBlock(ABC):
    """Abstract base class for all building blocks."""
    type: str

    @abstractmethod
    def get_block(self):
        raise NotImplementedError("Subclass must implement this method")


class BaseBuildingBlock(BaseModel):
    """Concrete base model for Pydantic validation, derived from abstract BuildingBlock."""
    type: str

    class Config:
        arbitrary_types_allowed = True


class Heading(BaseBuildingBlock):
    """Information about Heading building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "heading"
    text: Optional[str] = Field(default=None, description="Medium-sized heading text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"


class Title(BaseBuildingBlock):
    """Information about Title building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "title"
    text: Optional[str] = Field(default=None, description="Large-sized heading text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"

class QuestionContent(BaseModel):
    """Information about question's content."""

    displayQuestion: Optional[bool] = Field(default=True, description="Flag that tells rendering engine to display question text or not")
    displayImage: Optional[bool] = Field(default=False, description="Flag that tells rendering engine to display question image or not")
    text: Optional[str] = Field(default=None, description="Question text")
    image: Optional[str] = Field(default=None, description="Question image url")

class QuestionAnswer(BaseModel):
    """Information about question's answer."""


    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator for answer option")
    correct: bool = Field(default=True, description="Flag that tells rendering engine is this answer correct")
    text: Optional[str] = Field(default=None, description="Answer text")


class Question(BaseBuildingBlock):
    """Information about multi-choice Question building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "question"
    content: QuestionContent = Field(
        default_factory=QuestionContent, description="Question content such as question text, image."
    )
    answers: List[QuestionAnswer] = Field(
        default_factory=list, description="Answer options for the question"
    )

    def get_block(self):
        answers_text = " ".join([f"{answer.text} (Correct: {answer.correct})" for answer in self.answers])
        return f"[{self.type}] {self.id}\nContent: {self.content}\nAnswers: {answers_text}\n"

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to Question blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "question":
                    parsed_blocks.append(cls(**block))
                else:
                    raise ValueError(f"Unknown block type for Question: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks

class Text(BaseBuildingBlock):
    """Information about a Text building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "text"
    text: str = Field(..., description="Paragraph text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"

class SingleQuestion(BaseModel):
    """Container for a list of building blocks."""
    buildingBlocks: List[Union['Question']] = Field(
        default_factory=list,
        description="The list with the single question"
    )

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "question":
                    parsed_blocks.append(Question(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks
    
class QuestionPage(BaseBuildingBlock):
    """Information about a question page."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = Field(default='page', description="Question page is page building block.")
    name: str = Field(default='Page', description="The page name - This field is metadata and it's value describe what the page is about.")
    config: SingleQuestion = Field(
        default_factory=SingleQuestion, description="The building blocks that will be rendered on the page."
    )

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.buildingBlocks)
        return f"[{self.type}] {self.id}\n{blocks}\n"

class Pages(BaseModel):
    """Container for a list of pages."""
    pages:  List[Union['TopicIntorductionPage', 'QuestionPage']] = Field(default_factory=list, description="The list of carousel's pages")


class BuildingBlocks(BaseModel):
    """Container for a list of building blocks."""
    buildingBlocks: List[Union['Carousel', 'Title', 'Heading', 'Text']] = Field(
        default_factory=list,
        description="List of building blocks such as carousel, title, heading, or text."
    )

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "carousel":
                    parsed_blocks.append(Carousel(**block))
                elif block_type == "title":
                    parsed_blocks.append(Title(**block))
                elif block_type == "heading":
                    parsed_blocks.append(Heading(**block))
                elif block_type == "text":
                    parsed_blocks.append(Text(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks

class TopicIntorductionPage(BaseBuildingBlock):
    """Information about a micro-lessons page."""
    
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = Field(default='page', description="TopicIntroductionPage is a page.")
    name: str = Field(default='Page', description="The page name - This field is metadata and it's value describe what the page is about.")
    config: BuildingBlocks = Field(
        default_factory=BuildingBlocks, description="TopicIntroductionPage usually has a few blocks: heading (topic heading) and text block (topic explanation)."
    )

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.buildingBlocks)
        return f"[{self.type}] {self.id} {self.name} {blocks}\n"
    
class Buttons(BaseModel):
    """Navigation buttons for the Carousel."""
    previous: str = Field(default="Previous", description="Text for the Previous button.")
    next: str = Field(default="Next", description="Text for the Next button.")
    backToHome: str = Field(default="Back to Home", description="Text for the Back to Home button.")


class Carousel(BaseBuildingBlock):
    """Information about a Carousel building block."""    
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "carousel"
    title: Optional[str] = Field(default=None, description="Title of the section/carousel")
    description: Optional[str] = Field(default=None, description="Single sentence description about the section/carousel")
    buttons: Buttons = Field(default_factory=Buttons, description="Navigation buttons.")
    config: Pages = Field(description="Connected pages in the carousel.")

    def get_block(self):
        pages = " ".join(page.get_block() for page in self.config.pages)
        return f"[{self.type}] {self.title} {self.description} {self.id} {pages} {self.buttons}\n"


class Lessons(BaseModel):
    """Container for a carousels."""
    pages:  List[Union['Carousel']]  = Field(default_factory=list, description="Lessons are consists from multiple carousels")

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "carousel":
                    parsed_blocks.append(Carousel(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks
    
class LessonTemplate(BaseBuildingBlock):
    """Information about a Lesson Template."""
    
    id: str = str(uuid.uuid4())
    type: str = "page"
    config: Lessons = Field(description="The building blocks that will be rendered on the page.")

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.pages)
        return f"[{self.type}] {self.id}\n{blocks}\n"

# Update forward references
Pages.update_forward_refs()
BuildingBlocks.update_forward_refs()
Lessons.update_forward_refs()
SingleQuestion.update_forward_refs()
