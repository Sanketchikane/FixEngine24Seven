from backend.database import Base
from sqlalchemy import Column, Integer, String

class Service(Base):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
