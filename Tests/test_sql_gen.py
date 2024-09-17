import ai_text_to_sql
import ai_text_to_sql.llm_connectors
from analytics.sql_gen import *

'''
python -m pytest analytics/Tests/
'''

def test_initialize():
    sql_connect, ai_connect = initialize_connectors()
    assert isinstance(sql_connect, ai_text_to_sql.data_connectors.SQLiteConnector)
    assert isinstance(ai_connect, ai_text_to_sql.llm_connectors.OpenAIConnector)
